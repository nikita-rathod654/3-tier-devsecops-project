# CI/CD Pipeline → Kubernetes 3-Tier App

An end-to-end DevSecOps pipeline: infrastructure provisioned with Terraform, a developer's `git push` flows through Jenkins CI, a multi-stage Docker build, and delivery to Kubernetes (Dev → Prod), with Prometheus + Grafana monitoring the running app.

## Architecture

<img width="1018" height="980" alt="CICD Pipeline to Kubernetes 3-Tier Application" src="https://github.com/user-attachments/assets/1c6ac783-c781-4530-908b-60a3a95b1f4b" />

**Flow:** Terraform provisions infrastructure → Git push → Jenkins CI (build, test, Docker build, push image) → deploy to Dev K8s → promote to Prod K8s → 3-tier app (Frontend → Backend → Database) → Prometheus/Grafana monitoring on Prod.

## Tech stack

Terraform · Git · Jenkins · Docker (multi-stage) · Kubernetes · Prometheus · Grafana

## What this demonstrates

- Provisioning infrastructure as code with Terraform
- Building a CI pipeline in Jenkins triggered by GitHub webhooks
- Writing a multi-stage Dockerfile for lean, production-ready images
- Environment promotion (Dev → Prod) using the same built artifact, no rebuilds
- Deploying and managing a 3-tier app on Kubernetes across two clusters
- Setting up Prometheus + Grafana for runtime observability

## Notes

- Branching strategy: `dev`/ `prod` for explicit environment promotion.
- Same image is promoted from Dev to Prod — no rebuild between environments.
- Monitoring is scoped to the Prod cluster.

## Screenshots

<img width="1351" height="673" alt="jenkins pipeline" src="https://github.com/user-attachments/assets/8e364902-87ce-4833-be69-cb888964c72d" />

<img width="1352" height="690" alt="image" src="https://github.com/user-attachments/assets/b9cd0f1a-ad03-4625-b9f8-77e7b513054e" />

<img width="1362" height="686" alt="image" src="https://github.com/user-attachments/assets/bfab9fa3-8925-4750-8214-3cfdbd636ee0" />

<img width="1067" height="230" alt="image" src="https://github.com/user-attachments/assets/366eb1c3-c9c6-4511-b86e-a66748ff4814" />

<img width="1352" height="699" alt="image" src="https://github.com/user-attachments/assets/e2f601cb-bb9a-42c8-a907-309b54a42623" />

