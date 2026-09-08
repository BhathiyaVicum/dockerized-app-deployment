# 🐳 CloudLabX - Dockerized App Deployment on AWS EC2

![AWS](https://img.shields.io/badge/AWS-EC2-FF9900?logo=amazonaws&logoColor=white)
![Amazon Linux](https://img.shields.io/badge/Amazon%20Linux-2023-F90?logo=amazonlinux&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-20.10-2496ED?logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-1.22-009639?logo=nginx&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=nodedotjs&logoColor=white)
![Let's Encrypt](https://img.shields.io/badge/Let's%20Encrypt-SSL-003A70?logo=letsencrypt&logoColor=white)

## 📖 Overview

This project implements a complete DevOps deployment pipeline for a containerized Node.js application on AWS EC2. The infrastructure includes Docker containerization, Nginx reverse proxy, SSL/TLS encryption with Let's Encrypt, custom domain management, and health monitoring endpoints.

<img width="1920" height="1020" alt="ss7" src="https://github.com/user-attachments/assets/714b62d4-c927-41dc-8fe2-88cc8f623a51" />


---

## ✨ Features

- 🐳 **Dockerized Application** - Isolated container runtime
- 🔄 **Nginx Reverse Proxy** - Traffic routing and load balancing
- 🔐 **SSL/TLS Encryption** - HTTPS with Let's Encrypt
- 🌐 **Custom Domain** - DNS configuration with Namecheap

---

## 🚀 Deployment Process

### 1️⃣ EC2 Instance Configuration

An Amazon Linux 2023 EC2 instance (t2.micro) was launched with the following security group rules:
- SSH (port 22) - Restricted to specific IP
- HTTP (port 80) - Open to all (0.0.0.0/0)
- HTTPS (port 443) - Open to all (0.0.0.0/0)

### 2️⃣ Docker Installation

Docker was installed and configured on Amazon Linux 2023. The `ec2-user` was added to the `docker` group to enable command execution without `sudo`.

```bash
sudo dnf update -y
sudo dnf install docker -y
sudo service docker start
sudo chkconfig docker on
sudo usermod -a -G docker ec2-user
```

<img width="960" height="1020" alt="docker-1" src="https://github.com/user-attachments/assets/b85e4b5b-0d91-4c29-bcfe-9a15d62e9287" />

### 3️⃣ Docker Compose Setup

Docker Compose was installed as a standalone binary since Amazon Linux 2023 doesn't include it by default.

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 4️⃣ Docker Buildx Update

An issue was encountered where `docker-compose build` required buildx 0.17.0 or later. The buildx plugin was manually updated to resolve this.

```bash
sudo rm /usr/libexec/docker/cli-plugins/docker-buildx
sudo curl -L https://github.com/docker/buildx/releases/download/v0.36.1/buildx-v0.36.1.linux-amd64 -o /usr/libexec/docker/cli-plugins/docker-buildx
sudo chmod +x /usr/libexec/docker/cli-plugins/docker-buildx
```

### 5️⃣ Application Containerization

The following files were created in `~/myapp`:
- `package.json` - Node.js dependencies
- `index.js` - Express application with health check endpoints
- `Dockerfile` - Multi-stage build using Node.js 18 Alpine
- `docker-compose.yml` - Container orchestration with port mapping and restart policy

```bash
mkdir -p ~/myapp && cd ~/myapp
```

**Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

**docker-compose.yml:**
```yaml
services:
  app:
    build: .
    container_name: myapp
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

### 6️⃣ Container Build and Deployment

The Docker image was built and the container was started in detached mode. The application was verified to be running on port 3000.

```bash
docker-compose build
docker-compose up -d
docker ps
curl http://localhost:3000
```

<img width="960" height="1020" alt="ss2" src="https://github.com/user-attachments/assets/62949c3d-8b9c-4b01-a241-21c57556c32d" />


### 7️⃣ Nginx Reverse Proxy Configuration

Nginx was installed and configured as a reverse proxy to forward traffic from port 80 to the Docker container on port 3000.

```bash
sudo dnf install nginx -y
sudo service nginx start
sudo chkconfig nginx on
```

**Nginx Configuration (`/etc/nginx/conf.d/cloudlabx.me.conf`):**
```nginx
server {
    listen 80;
    server_name cloudlabx.me www.cloudlabx.me;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Configuration was tested and Nginx was reloaded:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

<img width="960" height="1020" alt="ss4" src="https://github.com/user-attachments/assets/f5d74200-200a-440c-9bfc-be010fb8f49a" />


### 8️⃣ DNS Configuration

DNS records on Namecheap were updated to point the domain to the EC2 instance:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | <EC2_PUBLIC_IP> | 5 min |
| A | www | <EC2_PUBLIC_IP> | 5 min |

<img width="1748" height="470" alt="image" src="https://github.com/user-attachments/assets/77138bf0-0a7e-4cc0-a7e5-02894a5adae8" />


### 9️⃣ SSL/TLS Implementation

Certbot was installed on Amazon Linux 2023 using `dnf`. Python dependency issues (`urllib3` and `cffi`) were resolved by reinstalling the required packages. SSL certificates were obtained and automatic HTTP-to-HTTPS redirection was configured.

```bash
sudo dnf install certbot python3-certbot-nginx -y
sudo dnf reinstall python3-urllib3 python3-cffi python3-cryptography python3-certbot python3-acme -y
sudo certbot --nginx -d cloudlabx.me -d www.cloudlabx.me
```

<img width="960" height="1020" alt="ss6" src="https://github.com/user-attachments/assets/8543adcd-67d2-4897-92dd-373969a4a47f" />

---

<img width="960" height="1020" alt="ss9" src="https://github.com/user-attachments/assets/3325d23a-e95d-48f3-98d4-9e12ac03b757" />

---

## 📊 API Endpoints

| Endpoint | Method | Description | Response Type |
|----------|--------|-------------|---------------|
| `/` | GET | Main application UI | HTML |
| `/api/health` | GET | Health check status | JSON |
| `/api/info` | GET | System information | JSON |

**Example Health Check Response:**
```json
{
  "status": "healthy",
  "uptime": 3600,
  "timestamp": "2026-09-08T12:00:00.000Z",
  "container": "myapp",
  "version": "1.0.0"
}
```
---

## 🔧 Troubleshooting & Resolutions

| Issue | Error | Resolution |
|-------|-------|------------|
| **Missing index.js** | `Cannot find module '/app/index.js'` | Created `index.js` with Express application |
| **Docker Buildx** | `requires buildx 0.17.0 or later` | Manually updated buildx plugin |
| **Certbot urllib3** | `ModuleNotFoundError: No module named 'urllib3'` | Reinstalled `python3-urllib3` |
| **Certbot cffi** | `DistributionNotFound: The 'cffi>=1.12' distribution was not found` | Reinstalled `python3-cffi` and `python3-cryptography` |
| **Nginx Config** | `open() "/etc/nginx/nginx.conf" failed` | Restored backup (used `cp` not `mv` for backups) |
| **502 Bad Gateway** | Nginx cannot reach Docker | Verified container running on port 3000 |

⭐ Star this repository if you found it helpful!
