variable "resource_group_name" {
  type    = string
  default = "mgs-rg"
}

variable "location" {
  type    = string
  default = "eastus"
}

variable "secondary_location" {
  type    = string
  default = "westus2"
}

variable "environment" {
  type    = string
  default = "production"
}

variable "k8s_node_count" {
  type    = number
  default = 3
}

variable "k8s_vm_size" {
  type    = string
  default = "Standard_D4s_v5"
}

variable "postgres_sku" {
  type    = string
  default = "GP_Standard_D2ds_v4"
}

variable "redis_sku" {
  type    = string
  default = "Standard"
}

variable "data_residency_region" {
  type        = string
  default     = "US"
  description = "Data residency region for compliance"
}

variable "tags" {
  type = map(string)
  default = {
    project     = "mgs"
    managed_by  = "terraform"
  }
}
