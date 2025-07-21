# Deploying macrokroma to Cloudflare Pages + Workers

This guide walks you through deploying your photography physics blog to Cloudflare with your custom domain.

## Architecture Overview

- **Frontend**: React app deployed to Cloudflare Pages
- **Backend API**: Cloudflare Workers for serverless functions
- **Database**: Cloudflare D1 (SQLite) or Neon PostgreSQL
- **Images**: Cloudflare R2 object storage
- **Domain**: Your custom domain via Cloudflare DNS

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Domain**: Add your domain to Cloudflare DNS
3. **Wrangler CLI**: Install globally with `npm install -g wrangler`
4. **GitHub Repository**: Push your code to GitHub

## Step 1: Setup Cloudflare D1 Database

```bash
# Login to Cloudflare
wrangler login

# Create production database
wrangler d1 create macrokroma-db

# Create development database
wrangler d1 create macrokroma-db-dev

# Note the database IDs returned and update wrangler.toml
```

Update `wrangler.toml` with your actual database IDs:
```toml
[[env.production.d1_databases]]
binding = "DB"
database_name = "macrokroma-db"
database_id = "your-actual-d1-database-id"
```

## Step 2: Create Database Schema

```bash
# Apply schema to production database
wrangler d1 execute macrokroma-db --file=./schema.sql

# Apply schema to development database
wrangler d1 execute macrokroma-db-dev --file=./schema.sql
```

You'll need to create `schema.sql` with your table definitions.

## Step 3: Setup Cloudflare R2 Storage

```bash
# Create R2 buckets for image storage
wrangler r2 bucket create macrokroma-images
wrangler r2 bucket create macrokroma-images-dev
```

## Step 4: Deploy the API Worker

```bash
# Build the worker
npm run build:worker

# Deploy to Cloudflare Workers
wrangler deploy --env production
```

Your API will be available at: `https://macrokroma-api.your-subdomain.workers.dev`

## Step 5: Deploy Frontend to Cloudflare Pages

### Option A: GitHub Integration (Recommended)

1. Go to [Cloudflare Pages dashboard](https://dash.cloudflare.com/pages)
2. Click "Create a project" → "Connect to Git"
3. Select your GitHub repository
4. Configure build settings:
   - **Build command**: `npm run build:pages`
   - **Build output directory**: `dist/public`
   - **Root directory**: `/`

### Option B: Direct Upload

```bash
# Build the frontend
npm run build:pages

# Install Wrangler Pages plugin
npm install -g @cloudflare/wrangler-pages

# Deploy directly
wrangler pages publish dist/public --project-name=macrokroma
```

## Step 6: Configure Custom Domain

1. In Cloudflare Pages dashboard, go to your project
2. Go to "Custom domains" tab
3. Click "Set up a custom domain"
4. Enter your domain (e.g., `macrokroma.com`)
5. Cloudflare will automatically configure DNS and SSL

## Step 7: Environment Variables

In your Cloudflare Pages project settings, add these environment variables:

```
VITE_API_URL=https://macrokroma-api.your-subdomain.workers.dev
```

## Step 8: Update API Configuration

Update the CORS settings in your Worker to include your custom domain:

```typescript
app.use('*', cors({
  origin: ['https://your-domain.com'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
```

## Step 9: Database Migration (Optional)

If you want to keep using PostgreSQL instead of D1:

1. Keep your Neon database
2. Add DATABASE_URL to Worker environment variables
3. Use the existing database setup

## Final Configuration

### DNS Settings in Cloudflare

1. Go to Cloudflare DNS dashboard
2. Ensure these records exist:
   - `A` record: `your-domain.com` → Cloudflare Pages IP
   - `CNAME` record: `www` → `your-domain.com`

### SSL/TLS Settings

1. Go to SSL/TLS → Overview
2. Set encryption mode to "Full (strict)"
3. Enable "Always Use HTTPS"

## Testing Your Deployment

1. Visit `https://your-domain.com`
2. Test the API endpoints
3. Upload images to verify R2 storage
4. Check all navigation and functionality

## Maintenance Commands

```bash
# View Worker logs
wrangler tail --env production

# Access D1 database
wrangler d1 execute macrokroma-db --command="SELECT * FROM posts LIMIT 5"

# Update Worker
wrangler deploy --env production

# Update Pages (with GitHub integration)
git push origin main  # Automatically triggers deployment
```

## Cost Estimation

Cloudflare Free Tier includes:
- **Pages**: Unlimited static requests
- **Workers**: 100,000 requests/day
- **D1**: 5M row reads, 100K row writes/day
- **R2**: 10GB storage, 1M Class A operations/month

This should easily handle a personal blog with thousands of visitors.

## Troubleshooting

### Common Issues:

1. **CORS errors**: Update allowed origins in Worker
2. **Database connection**: Check D1 binding configuration
3. **Images not loading**: Verify R2 bucket permissions
4. **Build failures**: Check build command and dependencies

### Useful Commands:

```bash
# Check Worker deployment status
wrangler whoami
wrangler deployments list

# Test Worker locally
wrangler dev --env development

# View Pages deployment logs
wrangler pages deployment list --project-name=macrokroma
```

Your macrokroma blog will now be running on Cloudflare's global network with macrokroma.com!

## Admin Access

The blog includes a hidden admin panel at `https://macrokroma.com/admin` with password protection:

- **URL**: https://macrokroma.com/admin
- **Default Password**: `B0ltzm@nnSchr0d1ng3r`
- **Features**: Create posts, manage images, quick access to all admin functions

**Security Note**: Change the admin password in `client/src/pages/admin.tsx` before deploying to production.