terraform {
  required_version = ">= 1.7.0"
  required_providers {
    azurerm = { source = "hashicorp/azurerm", version = "~> 4.0" }
  }
  backend "azurerm" {
    resource_group_name  = "mgs-tfstate"
    storage_account_name = "mgstfstate"
    container_name       = "tfstate"
    key                  = "mgs.tfstate"
  }
}

provider "azurerm" {
  features {}
}
