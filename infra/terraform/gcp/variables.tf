variable "project_id" { type = string }
variable "region" { type = string; default = "us-central1" }
variable "secondary_region" { type = string; default = "us-east1" }
variable "environment" { type = string; default = "production" }
variable "gke_node_count" { type = number; default = 3 }
variable "sql_tier" { type = string; default = "db-custom-2-8192" }
variable "data_residency_region" { type = string; default = "US" }
