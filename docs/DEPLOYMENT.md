# Deployment Guide

This guide covers production deployment of the Poseidon Global LMS using Docker.

## Prerequisites

- Docker 20.10+ and Docker Compose V2
- Git
- A production server with ports 80, 443, 3000, 4000, and 5432 available

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/PoseidonGlobal/poseidon-global-lms.git
   cd poseidon-global-lms
   ```

2. **Set up environment files**
   ```bash
   # Backend environment
   cp backend/.env.example backend/.env
   # Edit backend/.env with your production values
   
   # Frontend environment  
   cp frontend/.env.local.example frontend/.env.local
   # Edit frontend/.env.local with your production values
   ```

3. **Build and start services**
   ```bash
   docker compose -f docker-compose.prod.yml build
   docker compose -f docker-compose.prod.yml up -d
   ```

4. **Verify deployment**
   ```bash
   # Check service health
   docker compose -f docker-compose.prod.yml ps
   
   # Test endpoints
   curl http://127.0.0.1:4000/healthz  # Backend health
   curl http://127.0.0.1:3000/         # Frontend
   ```

## Environment Configuration

### Backend (.env)
```bash
# Server Configuration
PORT=4000
NODE_ENV=production

# Database
DATABASE_URL=postgresql://postgres:postgres@db:5432/poseidon_lms?schema=public

# Security
JWT_SECRET=your-very-secure-jwt-secret-change-this
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```bash
# Next.js Configuration
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1

# Authentication
NEXTAUTH_SECRET=your-very-secure-nextauth-secret-min-32-chars
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://postgres:postgres@db:5432/poseidon_lms?schema=public

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

## Production Nginx Reverse Proxy

For production deployment with custom domains, use Nginx as a reverse proxy:

### Nginx Configuration (`/etc/nginx/sites-available/lms`)

```nginx
upstream backend {
    server 127.0.0.1:4000;
}

upstream frontend {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    # SSL Configuration
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # API Routes
    location /api/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Health check endpoint
    location /healthz {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Frontend
    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Enable the site
```bash
# Enable the configuration
sudo ln -s /etc/nginx/sites-available/lms /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

## SSL/TLS Setup with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

## Production Environment Variables

Update your environment files for production:

### Backend Production (.env)
```bash
PORT=4000
NODE_ENV=production
DATABASE_URL=postgresql://postgres:secure_password@db:5432/poseidon_lms?schema=public
JWT_SECRET=your-very-secure-jwt-secret-change-this-in-production
CORS_ORIGIN=https://yourdomain.com
LOG_LEVEL=warn
```

### Frontend Production (.env.local)
```bash
NODE_ENV=production
NEXTAUTH_SECRET=your-very-secure-nextauth-secret-min-32-chars-change-in-production
NEXTAUTH_URL=https://yourdomain.com
DATABASE_URL=postgresql://postgres:secure_password@db:5432/poseidon_lms?schema=public
NEXT_PUBLIC_API_BASE_URL=https://yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_TELEMETRY_DISABLED=1
```

## Database Migration

If you're upgrading from a previous version:

```bash
# Backup existing database
docker compose -f docker-compose.prod.yml exec db pg_dump -U postgres poseidon_lms > backup.sql

# Run migrations (if using Prisma)
docker compose -f docker-compose.prod.yml exec frontend npx prisma migrate deploy
```

## Monitoring

### Health Checks

The deployment includes built-in health checks:

- **Database**: `pg_isready` check every 10s
- **Backend**: `/healthz` endpoint check every 30s  
- **Frontend**: Homepage check every 30s

### Logs

View service logs:
```bash
# All services
docker compose -f docker-compose.prod.yml logs -f

# Specific service
docker compose -f docker-compose.prod.yml logs -f backend
docker compose -f docker-compose.prod.yml logs -f frontend
docker compose -f docker-compose.prod.yml logs -f db
```

### Service Status
```bash
# Check running services
docker compose -f docker-compose.prod.yml ps

# Check service health
docker compose -f docker-compose.prod.yml ps --format table
```

## Backup and Recovery

### Database Backup
```bash
# Create backup
docker compose -f docker-compose.prod.yml exec db pg_dump -U postgres -d poseidon_lms > backup-$(date +%Y%m%d).sql

# Restore backup
docker compose -f docker-compose.prod.yml exec -T db psql -U postgres -d poseidon_lms < backup-20240101.sql
```

### Volume Backup
```bash
# Backup PostgreSQL data volume
docker run --rm -v poseidon-global-lms_postgres-data:/data -v $(pwd):/backup alpine tar czf /backup/postgres-backup-$(date +%Y%m%d).tar.gz -C /data .
```

## Troubleshooting

### Common Issues

1. **Services won't start**
   ```bash
   # Check logs
   docker compose -f docker-compose.prod.yml logs
   
   # Verify environment files exist
   ls -la backend/.env frontend/.env.local
   ```

2. **Health checks failing**
   ```bash
   # Check if ports are accessible
   curl http://127.0.0.1:4000/healthz
   curl http://127.0.0.1:3000/
   
   # Check service status
   docker compose -f docker-compose.prod.yml ps
   ```

3. **Database connection issues**
   ```bash
   # Test database connectivity
   docker compose -f docker-compose.prod.yml exec db psql -U postgres -d poseidon_lms -c "SELECT version();"
   ```

4. **Permission issues**
   ```bash
   # Check file ownership
   ls -la backend/.env frontend/.env.local
   
   # Fix permissions if needed
   chmod 600 backend/.env frontend/.env.local
   ```

### Performance Tuning

1. **Enable Next.js standalone output** (for smaller Docker images):
   Add to `frontend/next.config.js`:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'standalone',
   }
   
   module.exports = nextConfig
   ```

2. **PostgreSQL tuning** for production:
   Create `postgres.conf` and mount as volume for custom PostgreSQL settings.

## Security Considerations

1. **Change default passwords** in production
2. **Use strong secrets** for JWT and NextAuth
3. **Enable SSL/TLS** with valid certificates  
4. **Configure firewall** rules appropriately
5. **Regular security updates** for base images
6. **Monitor logs** for suspicious activity
7. **Use environment-specific secrets management**

## Scaling

For high-traffic deployments:

1. **Use external PostgreSQL** (AWS RDS, Google Cloud SQL)
2. **Load balance** multiple frontend/backend instances
3. **Use Redis** for session storage
4. **Enable CDN** for static assets
5. **Implement database read replicas**

## Support

For deployment issues, check:

1. **GitHub Issues**: https://github.com/PoseidonGlobal/poseidon-global-lms/issues
2. **Documentation**: README.md in the repository
3. **Health endpoints**: 
   - Backend: `GET /healthz`
   - Frontend: `GET /`