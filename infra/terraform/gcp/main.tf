resource "google_container_cluster" "main" {
  name     = "mgs-gke-${var.environment}"
  location = var.region

  initial_node_count       = var.gke_node_count
  remove_default_node_pool = false

  node_config {
    machine_type = "e2-standard-4"
    oauth_scopes = ["https://www.googleapis.com/auth/cloud-platform"]
  }
}

resource "google_artifact_registry_repository" "main" {
  location      = var.region
  repository_id = "mgs-${var.environment}"
  format        = "DOCKER"
}

resource "google_sql_database_instance" "main" {
  name             = "mgs-sql-${var.environment}"
  database_version = "POSTGRES_16"
  region           = var.region

  settings {
    tier              = var.sql_tier
    availability_type = var.environment == "production" ? "REGIONAL" : "ZONAL"
    backup_configuration {
      enabled            = true
      point_in_time_recovery_enabled = true
    }
  }

  deletion_protection = var.environment == "production"
}

resource "google_sql_database" "main" {
  name     = "mgs"
  instance = google_sql_database_instance.main.name
}

resource "google_redis_instance" "main" {
  name           = "mgs-redis-${var.environment}"
  tier           = "STANDARD_HA"
  memory_size_gb = 1
  region         = var.region
}

resource "google_storage_bucket" "workflows" {
  name          = "mgs-workflows-${var.project_id}"
  location      = var.data_residency_region
  force_destroy = var.environment != "production"
}
