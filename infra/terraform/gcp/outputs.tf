output "gke_cluster_name" { value = google_container_cluster.main.name }
output "artifact_registry" { value = google_artifact_registry_repository.main.id }
output "sql_connection" { value = google_sql_database_instance.main.connection_name }
output "redis_host" { value = google_redis_instance.main.host }
output "gcs_bucket" { value = google_storage_bucket.workflows.name }
