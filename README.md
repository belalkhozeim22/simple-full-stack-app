CI/CD-Driven Kubernetes Application on Google Cloud Platform
1. Architecture Overview
This project demonstrates a full end-to-end CI/CD workflow for deploying a containerized full-stack application (backend and frontend) on Google Kubernetes Engine (GKE) using GitHub Actions. The architecture is designed following cloud-native principles, emphasizing automation, security, scalability, and operational simplicity.
The application consists of two independently deployed services: a backend API and a frontend application. Each service is packaged as a Docker image and stored in Google Artifact Registry. A GitHub Actions pipeline is triggered on every push to the main or staging branches, automating the build, vulnerability scanning, image publishing, and Kubernetes deployment processes. The deployment target is determined dynamically based on the branch, ensuring environment separation between staging and production.
This architecture was chosen because it balances robustness and cost-efficiency. Kubernetes provides self-healing, scalability, and declarative deployments, while GitHub Actions offers native CI/CD integration with minimal operational overhead. Google Cloud services were selected for their tight Kubernetes integration, reliable infrastructure, and strong IAM-based security model.
Architecture Diagram (Logical Flow)
Developer pushes code to GitHub
→ GitHub Actions CI/CD pipeline starts
→ Docker images are built for backend and frontend
→ Images are scanned for vulnerabilities using Trivy
→ Images are pushed to Google Artifact Registry
→ GitHub Actions authenticates to GKE
→ Kubernetes manifests are applied to staging or production namespace
→ Application pods run inside GKE with health checks and services
Key Components and Interaction
GitHub Actions orchestrates the CI/CD pipeline
Docker builds immutable container images
Google Artifact Registry stores versioned container images
Google Kubernetes Engine runs and manages containers
kubectl applies Kubernetes manifests and updates workloads
2. Setup Instructions
Prerequisites
A Google Cloud Platform project
A configured GKE cluster
An Artifact Registry Docker repository
A GitHub repository containing the application code
A Google Cloud service account with the following permissions:
Artifact Registry Writer
Kubernetes Engine Developer
Kubernetes Engine Cluster Viewer
GitHub Secrets configured:
GCP_PROJECT_ID
GKE_REGION
GKE_CLUSTER
GCP_SA_KEY
Deployment Steps
Clone the GitHub repository
Create and configure the GKE cluster
Create the Artifact Registry repository
Create a Google Cloud service account and download the JSON key
Add the service account key and project details to GitHub Secrets
Push code to the staging or main branch
Allow GitHub Actions to automatically build, scan, push, and deploy the application
3. Architecture Decisions
Why Google Cloud Platform
GCP was selected due to its fully managed Kubernetes service (GKE), integrated Artifact Registry, and native IAM model. GKE simplifies cluster management while providing enterprise-grade reliability and security.
Why This Kubernetes Setup
A single GKE cluster with separate namespaces (staging and production) was chosen to reduce infrastructure cost while still maintaining environment isolation. This approach allows safe testing in staging before promoting changes to production.
Database Connectivity Approach
Database credentials are injected via Kubernetes secrets and environment variables. Access to the database is restricted to internal networking, ensuring that only authorized pods can communicate with it.
CI/CD Tool Choice
GitHub Actions was chosen because it is tightly integrated with GitHub repositories, supports modern CI/CD workflows, and eliminates the need for maintaining external CI infrastructure.
Trade-offs Considered
Single cluster versus multiple clusters
Namespace isolation versus full environment duplication
Operational simplicity versus maximum fault isolation
4. Cost Optimization
A single GKE cluster is used instead of multiple clusters
Namespaces reduce infrastructure duplication
Artifact Registry is used instead of external container registries
CI/CD pipelines run only on code changes
No persistent build servers or runners are required
5. Security Considerations
Secrets Management
Sensitive data is stored in GitHub Secrets and Kubernetes Secrets
Service account keys are never committed to the repository
Secrets are injected only at runtime
Network Security
The GKE cluster uses private networking
Only required services are exposed
Internal communication is restricted within the cluster
Database Access
Database credentials are stored securely
Access is limited to backend services
No public database endpoints are exposed
Container Security
Images are scanned using Trivy during CI
High and critical vulnerabilities are surfaced early
Minimal base images reduce attack surface
6. Troubleshooting Guide
Checking Pod Status
Use kubectl to list pods in the desired namespace
Inspect pod states such as CrashLoopBackOff or Pending
Viewing Logs
Use kubectl logs to view application logs
Check for startup failures or runtime errors
Connecting to the Database
Exec into the backend pod using kubectl
Verify environment variables and database connectivity
Verifying Connectivity
Check Kubernetes services and endpoints
Describe pods and services to identify misconfigurations
7. Future Improvements
Monitoring Enhancements
Integrate Prometheus and Grafana
Enable Google Cloud Monitoring and alerting
Security Hardening
Adopt Workload Identity instead of service account keys
Apply Kubernetes Network Policies
Enforce Pod Security Standards
Performance Optimizations
Enable Horizontal Pod Autoscaling
Define CPU and memory resource limits
Optimize container startup times
High Availability
Deploy multiple replicas per service
Use multi-zone node pools
Implement rolling updates and readiness probes