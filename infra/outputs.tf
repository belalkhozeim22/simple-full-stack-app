output "gke_cluster_name" {
  value = google_container_cluster.gke.name
}

output "gke_cluster_endpoint" {
  value = google_container_cluster.gke.endpoint
}

output "cloudsql_private_ip" {
  value = google_sql_database_instance.postgres.private_ip_address
}

output "vpc_name" {
  value = google_compute_network.vpc.name
}
