Project Documentation
1. Architecture Overview
Our application follows a microservices-inspired architecture, deployed on Google Cloud Platform (GCP) using Kubernetes (GKE). The architecture is designed to provide scalability, maintainability, and streamlined CI/CD deployments.
Key components:
Backend: Node.js application running inside a Docker container, providing REST APIs.
Frontend: React application, served via containerized Nginx.
Database: Managed PostgreSQL instance (Cloud SQL) for persistent storage.
CI/CD pipeline: GitHub Actions for automated build, vulnerability scanning, Docker image push, and Kubernetes deployment.
Interaction flow:
Developers push code to main or staging.
GitHub Actions builds Docker images and scans for vulnerabilities using Trivy.
Images are pushed to Artifact Registry.
GKE pulls updated images and applies Kubernetes manifests to deploy services.
Diagram:



# Project Technical Documentation: GKE Full-Stack Deployment

This repository hosts a production-grade, containerized full-stack application orchestrated by **Google Kubernetes Engine (GKE)**. The infrastructure follows modern DevOps patterns, utilizing **GitHub Actions** for automated delivery and **Cloud SQL** for managed relational data.

---

## 🏛️ System Architecture

The following diagram illustrates the end-to-end lifecycle, from developer commit to high-availability deployment within Google Cloud.

```mermaid
graph TD
    subgraph Local_Dev [Development Layer]
        Dev[Developer] -- Git Push --> GH[GitHub Repository]
    end

    subgraph Pipeline [CI/CD Pipeline - GitHub Actions]
        GH --> Build[Docker Build]
        Build --> Scan[Vulnerability Scan]
        Scan --> Push[Push to Artifact Registry]
        Push --> K8s_Deploy[kubectl apply]
    end

    subgraph GCP [Google Cloud Platform]
        subgraph GKE [GKE Cluster]
            direction TB
            FE[Frontend Pod: React/Nginx]
            BE[Backend Pod: Node.js]
            LB[K8s Load Balancer]
        end

        subgraph Storage_Layer [Data Layer]
            DB[(Cloud SQL: PostgreSQL)]
            PV[Persistent Volume]
        end
    end

    %% Connections
    K8s_Deploy -.-> GKE
    Users((Users)) --> LB
    LB --> FE
    LB --> BE
    FE --> BE
    BE --> DB
    DB --- PV

    %% Styling
    style GCP fill:#f9f9f9,stroke:#4285F4,stroke-width:2px
    style Pipeline fill:#effaf0,stroke:#28a745,stroke-width:2px
    style GKE fill:#e8f0fe,stroke:#1a73e8,stroke-width:2px


Why this architecture:
Kubernetes ensures scalability and resiliency.
Docker containers provide consistent deployments across environments.
CI/CD automates testing, scanning, and deployment to reduce human errors.
2. Setup Instructions
Prerequisites
GCP Project with GKE cluster and Artifact Registry.
Cloud SQL PostgreSQL instance.
GitHub repository with Secrets set for:
GCP_PROJECT_ID
GKE_REGION
GKE_CLUSTER
GCP_SA_KEY (Service Account JSON)
Installed tools:
kubectl
gcloud CLI
Docker
Deployment Steps
Clone repository:
git clone <repo-url>
cd <project-folder>
Authenticate to GCP:
gcloud auth activate-service-account --key-file=$GCP_SA_KEY
gcloud config set project $GCP_PROJECT_ID
Get Kubernetes credentials:
gcloud container clusters get-credentials $GKE_CLUSTER --region $GKE_REGION
Build Docker images:
docker build -t us-central1-docker.pkg.dev/$GCP_PROJECT_ID/apps/backend:<commit-sha> ./backend
docker build -t us-central1-docker.pkg.dev/$GCP_PROJECT_ID/apps/frontend:<commit-sha> ./frontend
Push images:
docker push us-central1-docker.pkg.dev/$GCP_PROJECT_ID/apps/backend:<commit-sha>
docker push us-central1-docker.pkg.dev/$GCP_PROJECT_ID/apps/frontend:<commit-sha>
Deploy to GKE:
kubectl apply -f k8s/namespaces.yaml
kubectl apply -n <namespace> -f k8s/backend.yaml
kubectl apply -n <namespace> -f k8s/frontend.yaml
3. Architecture Decisions
Cloud provider: GCP was chosen for its managed Kubernetes service (GKE) and integration with Artifact Registry & Cloud SQL.
Kubernetes setup: GKE allows scalable clusters with managed upgrades and security patches.
Database connectivity: Cloud SQL with private IP ensures secure connectivity from GKE pods.
CI/CD tool: GitHub Actions was chosen for its native GitHub integration, flexibility, and ability to use secrets securely.
Trade-offs: Using managed services increases cost slightly but saves operational overhead.
4. Cost Optimization
Managed services reduce maintenance but scale dynamically to control costs.
Pod auto-scaling ensures resources are only used when necessary.
Docker image layers optimized for size to reduce storage and network usage.
5. Security Considerations
Secrets management: GCP Secret Manager and GitHub secrets used for credentials.
Network security: Private IP for database, and firewall rules to limit access.
Database access: IAM roles and least-privilege principle applied.
Container security: Vulnerability scans using Trivy; images built from minimal base images.
6. Troubleshooting Guide
Check pod status:
kubectl get pods -n <namespace>
View logs:
kubectl logs <pod-name> -n <namespace>
Connect to database:
gcloud sql connect <instance-name> --user=<user>
Verify connectivity:
kubectl exec -it <pod-name> -n <namespace> -- curl http://<service>:<port>
7. Future Improvements
Monitoring enhancements: Add Prometheus/Grafana dashboards for metrics.
High availability: Multi-zone GKE cluster with replicas and read replicas for the database.