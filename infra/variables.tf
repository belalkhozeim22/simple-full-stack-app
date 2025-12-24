variable "project_id" {
  description = "GCP Project ID"
  type        = string
  default = "steel-ridge-482212-p8"
}

variable "region" {
  description = "GCP Region"
  type        = string
  default     = "us-central1"
}

variable "vpc_name" {
  description = "VPC name"
  type        = string
  default     = "platform-vpc"
}

variable "subnet_cidr" {
  description = "Subnet CIDR"
  type        = string
  default     = "10.10.0.0/16"
}

variable "cluster_name" {
  description = "GKE cluster name"
  type        = string
  default     = "platform-gke"
}

variable "node_machine_type" {
  description = "GKE node machine type"
  type        = string
  default     = "e2-medium"
}

variable "db_name" {
  description = "Cloud SQL database name"
  type        = string
  default     = "appdb"
}

variable "db_user" {
  description = "Database username"
  type        = string
  default     = "appuser"
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}
