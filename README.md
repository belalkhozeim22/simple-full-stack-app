# CI/CD-Driven Kubernetes Application on Google Cloud Platform

## Overview
This project showcases a full CI/CD workflow for deploying a containerized full-stack application (backend + frontend) on **Google Kubernetes Engine (GKE)** using **GitHub Actions**.  
The architecture emphasizes **automation, security, scalability, and operational simplicity**.

- **Backend API** and **Frontend app** are packaged as Docker images stored in **Google Artifact Registry**.  
- CI/CD pipeline triggers on pushes to `production` or `staging` branches, automating build, vulnerability scanning, image publishing, and Kubernetes deployment.  
- Branch-based deployment ensures **environment separation** between staging and production.  

## Architecture Flow
Developer pushes code → GitHub Actions CI/CD → Docker build → Trivy scan → Push to Artifact Registry
→ Authenticate to GKE → Apply Kubernetes manifests → Pods run with health checks & services


### Key Components
- **GitHub Actions**: Orchestrates CI/CD  
- **Docker**: Builds immutable container images  
- **Artifact Registry**: Stores versioned images  
- **GKE**: Runs and manages containers  
- **kubectl**: Applies Kubernetes manifests  

## Setup

### Prerequisites
- Google Cloud project with:
  - **GKE cluster**  
  - **Artifact Registry repository**  
- GitHub repository with application code  
- Google Cloud service account with:
  - Artifact Registry Writer  
  - Kubernetes Engine Developer  
  - Kubernetes Engine Cluster Viewer  
- GitHub Secrets:
  - `GCP_PROJECT_ID`  
  - `GKE_REGION`  
  - `GKE_CLUSTER`  
  - `GCP_SA_KEY`  

### Deployment Steps
1. Clone the repository  
2. Configure GKE cluster & Artifact Registry  
3. Create a service account and add its key to GitHub Secrets  
4. Push code to `staging` or `main` → GitHub Actions handles build, scan, push, deploy  

## Architecture Decisions
- **Single Cluster, Multi-Namespace**: Staging & production isolation with lower cost  
- **Secrets Management**: Database credentials via Kubernetes secrets  
- **CI/CD Tool**: GitHub Actions for tight GitHub integration and simplicity  

### Trade-offs
- Single cluster vs multiple clusters  
- Namespace isolation vs full environment duplication  
- Operational simplicity vs fault isolation  

### Cost Optimization
- Single GKE cluster with namespaces  
- CI/CD triggers only on code changes  
- Artifact Registry avoids external registry costs  

## Security
- **Secrets**: Stored in GitHub & Kubernetes Secrets; injected at runtime  
- **Network**: Private GKE cluster; only necessary services exposed  
- **Database**: Credentials secured; no public endpoints  
- **Containers**: Trivy scans for vulnerabilities; minimal base images  

## Troubleshooting
- **Pod Status**:  


Future Improvements
Monitoring: Prometheus/Grafana, GCP alerts
Security: Workload Identity, Network Policies, Pod Security Standards
Performance: Horizontal Pod Autoscaling, resource limits, optimized startup
High Availability: Multi-replica services, multi-zone node pools, rolling updates

