resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
  tags     = var.tags
}

# ─── AKS Cluster ────────────────────────────────────
resource "azurerm_kubernetes_cluster" "main" {
  name                = "mgs-aks-${var.environment}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  dns_prefix          = "mgs-${var.environment}"
  kubernetes_version  = "1.30"

  default_node_pool {
    name       = "default"
    node_count = var.k8s_node_count
    vm_size    = var.k8s_vm_size
  }

  identity { type = "SystemAssigned" }

  network_profile {
    network_plugin = "azure"
    network_policy = "calico"
  }

  tags = var.tags
}

# ─── Container Registry ─────────────────────────────
resource "azurerm_container_registry" "main" {
  name                = "mgsacr${var.environment}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Standard"
  admin_enabled       = true
  tags                = var.tags
}

# ─── PostgreSQL Flexible Server ──────────────────────
resource "azurerm_postgresql_flexible_server" "main" {
  name                          = "mgs-pg-${var.environment}"
  resource_group_name           = azurerm_resource_group.main.name
  location                      = azurerm_resource_group.main.location
  administrator_login           = "mgsadmin"
  administrator_password        = var.postgres_password
  sku_name                      = var.postgres_sku
  version                       = "16"
  storage_mb                    = 65536
  backup_retention_days         = 14
  geo_redundant_backup_enabled  = var.environment == "production"
  tags                          = var.tags
}

variable "postgres_password" {
  type      = string
  sensitive = true
}

resource "azurerm_postgresql_flexible_server_database" "main" {
  name      = "mgs"
  server_id = azurerm_postgresql_flexible_server.main.id
}

# ─── Redis Cache ─────────────────────────────────────
resource "azurerm_redis_cache" "main" {
  name                = "mgs-redis-${var.environment}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  capacity            = 1
  family              = "C"
  sku_name            = var.redis_sku
  non_ssl_port_enabled = false
  minimum_tls_version  = "1.2"
  tags                 = var.tags
}

# ─── Storage Account (Blob) ─────────────────────────
resource "azurerm_storage_account" "main" {
  name                     = "mgsblobs${var.environment}"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = var.environment == "production" ? "GRS" : "LRS"
  tags                     = var.tags
}

resource "azurerm_storage_container" "workflows" {
  name                  = "mgs-workflows"
  storage_account_id    = azurerm_storage_account.main.id
  container_access_type = "private"
}

# ─── Key Vault ───────────────────────────────────────
resource "azurerm_key_vault" "main" {
  name                = "mgs-kv-${var.environment}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  tenant_id           = data.azurerm_client_config.current.tenant_id
  sku_name            = "standard"
  tags                = var.tags
}

data "azurerm_client_config" "current" {}
