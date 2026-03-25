"""Pulumi program — mirrors Terraform Azure stack as an alternative IaC option."""

import pulumi
from pulumi_azure_native import containerregistry, containerservice, dbforpostgresql, cache, resources, storage

config = pulumi.Config()
env = config.get("environment") or "development"
node_count = config.get_int("nodeCount") or 2

# ─── Resource Group ──────────────────────────────────
rg = resources.ResourceGroup(f"mgs-rg-{env}")

# ─── AKS Cluster ─────────────────────────────────────
aks = containerservice.ManagedCluster(
    f"mgs-aks-{env}",
    resource_group_name=rg.name,
    agent_pool_profiles=[{
        "name": "default",
        "count": node_count,
        "vm_size": "Standard_D4s_v5",
        "mode": "System",
    }],
    dns_prefix=f"mgs-{env}",
    identity={"type": "SystemAssigned"},
)

# ─── Container Registry ──────────────────────────────
acr = containerregistry.Registry(
    f"mgsacr{env}",
    resource_group_name=rg.name,
    sku={"name": "Standard"},
    admin_user_enabled=True,
)

# ─── PostgreSQL ───────────────────────────────────────
pg = dbforpostgresql.Server(
    f"mgs-pg-{env}",
    resource_group_name=rg.name,
    sku={"name": "Standard_D2ds_v4", "tier": "GeneralPurpose"},
    version="16",
    storage={"storage_size_gb": 64},
    administrator_login="mgsadmin",
    administrator_login_password=config.require_secret("pgPassword"),
)

# ─── Redis Cache ──────────────────────────────────────
redis = cache.Redis(
    f"mgs-redis-{env}",
    resource_group_name=rg.name,
    sku={"name": "Standard", "family": "C", "capacity": 1},
    minimum_tls_version="1.2",
)

# ─── Blob Storage ─────────────────────────────────────
sa = storage.StorageAccount(
    f"mgsblobs{env}",
    resource_group_name=rg.name,
    kind="StorageV2",
    sku={"name": "Standard_LRS"},
)

# ─── Exports ──────────────────────────────────────────
pulumi.export("aks_name", aks.name)
pulumi.export("acr_login_server", acr.login_server)
pulumi.export("pg_fqdn", pg.fully_qualified_domain_name)
pulumi.export("redis_hostname", redis.host_name)
