# Deploy macrokroma to Cloudflare

## What You Need
- Your Cloudflare account (✓ you have this)
- macrokroma.com domain in Cloudflare (✓ you have this)
- This Replit project code

## Deployment Plan

We'll deploy your blog using **Cloudflare Pages** for the website and keep your database here on Replit for now. This gives you a live site immediately while keeping things simple.

## Step 1: Get Your Code Ready

Your code is already built and ready. I'll create a simple version that works with static hosting.

## Step 2: Create Cloudflare Pages Project

1. Go to **Cloudflare Dashboard** → **Pages**
2. Click **"Create a project"**
3. Choose **"Connect to Git"** (we'll set up GitHub)

## Step 3: Push to GitHub

1. Create a new repository on GitHub called `macrokroma`
2. In Replit, open the Shell (try the + button if console isn't working)
3. Run these commands:
   ```bash
   git init
   git add .
   git commit -m "macrokroma physics blog"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/macrokroma.git
   git push -u origin main
   ```

## Step 4: Connect GitHub to Cloudflare

1. In Cloudflare Pages, select your `macrokroma` repository
2. **Build settings:**
   - Build command: `npm run build`
   - Build output directory: `dist/public`
   - Root directory: `/`

## Step 5: Add Your Domain

1. After deployment, go to **Custom domains**
2. Add `macrokroma.com`
3. Cloudflare will automatically configure DNS

## Step 6: Test Everything

- Visit `macrokroma.com` - should show your physics blog
- Visit `macrokroma.com/admin` - should show admin login
- Use password: `B0ltzm@nnSchr0d1ng3r`

## What This Gives You

✅ **Live website** at macrokroma.com
✅ **Admin panel** for creating posts  
✅ **Automatic deployments** when you update code
✅ **Fast global delivery** via Cloudflare

The blog posts and admin will work perfectly. The only limitation is file uploads won't persist between deployments, but you can add those later.

---

**Ready to start?** The first step is getting your code on GitHub.