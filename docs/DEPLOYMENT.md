# Deployment Guide

Complete guide for deploying ProBet Sports to staging and production environments.

## Table of Contents
- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Build for Production](#build-for-production)
- [Deployment Options](#deployment-options)
- [Environment Setup](#environment-setup)
- [Post-Deployment](#post-deployment)
- [Rollback](#rollback)

---

## Pre-Deployment Checklist

### Code Quality

- [ ] All tests pass (`npm test`)
- [ ] No console errors in DevTools
- [ ] No console warnings related to code
- [ ] TypeScript compiles without errors (`npm run build`)
- [ ] ESLint has no critical issues

### Functionality

- [ ] Form validation works
- [ ] API integration works
- [ ] Dropdowns populate correctly
- [ ] Form submission succeeds
- [ ] Success message displays
- [ ] Form persistence works
- [ ] All buttons functional

### Browser Compatibility

- [ ] Works in Chrome (latest)
- [ ] Works in Firefox (latest)
- [ ] Works in Safari (latest)
- [ ] Works in Edge (latest)
- [ ] Mobile responsive (tested on mobile)

### Security

- [ ] No hardcoded secrets in code
- [ ] No sensitive data in localStorage
- [ ] API endpoints are secure
- [ ] HTTPS enabled (for production)
- [ ] CORS properly configured

### Documentation

- [ ] README updated
- [ ] API documentation current
- [ ] Configuration documented
- [ ] Deployment steps documented
- [ ] Known issues listed

### Performance

- [ ] Page load time < 2 seconds
- [ ] API responses < 1 second
- [ ] No memory leaks detected
- [ ] CSS and JS minified
- [ ] Images optimized

---

## Build for Production

### Production Build

```bash
# 1. Compile TypeScript for production
npm run build

# 2. Minify and optimize (if using build tool)
# This step depends on your build setup

# 3. Verify build succeeded
ls dist/
# Should show .js files
```

### Environment Configuration

**Set production environment:**

**Option 1: Via environment variable**
```bash
REACT_APP_ENV=production npm run build
```

**Option 2: Edit config**
Edit `src/config.ts`:
```typescript
private getApiBaseUrl(environment: string): string {
    if (environment === 'production') {
        return 'https://api.probet-sports.com';  // ← Update this
    }
}
```

**Option 3: Create .env file**
```
REACT_APP_ENV=production
REACT_APP_API_BASE_URL=https://api.probet-sports.com
```

### Bundle Size Check

```bash
# Check final bundle size
ls -lh dist/form.js

# Should be reasonable size (< 100KB for our app)
```

---

## Deployment Options

### Option 1: Static Hosting (Recommended for Frontend)

**Suitable for:** Hosting HTML, CSS, JavaScript only

**Providers:**
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

**Steps:**

1. **Build project:**
   ```bash
   npm run build
   ```

2. **Upload files:**
   - Upload `index.html` to root
   - Upload `styles.css` to root
   - Upload `dist/` folder
   - Upload any image assets

3. **Configure:**
   - Set build command: `npm run build`
   - Set output directory: `./` (root) or `dist/`
   - Set environment variables

**Example: Netlify**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod

# Alternatively, connect GitHub repo to Netlify for auto-deploy
```

---

### Option 2: Node.js Server Hosting

**Suitable for:** Full stack deployment (frontend + API)

**Providers:**
- Heroku
- DigitalOcean
- AWS EC2
- Google Cloud Platform
- Railway.app

**Steps:**

1. **Build project:**
   ```bash
   npm run build
   ```

2. **Create Procfile:**
   ```
   web: npm run server
   ```

3. **Set environment variables:**
   ```
   NODE_ENV=production
   PORT=3000
   ```

4. **Deploy:**
   ```bash
   # Heroku example
   git push heroku main
   ```

**Example: Railway.app**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway up
```

---

### Option 3: Docker Container

**Suitable for:** Cloud-native deployment

**Create Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000 8080

CMD ["npm", "run", "server"]
```

**Build and push:**
```bash
# Build image
docker build -t probet-sports:latest .

# Run container
docker run -p 3000:3000 -p 8080:8080 probet-sports:latest

# Push to registry (Docker Hub, ECR, etc.)
docker tag probet-sports:latest username/probet-sports:latest
docker push username/probet-sports:latest
```

---

## Environment Setup

### Staging Environment

**Configuration:**
```
Environment: staging
API URL: https://staging-api.probet-sports.com
Frontend URL: https://staging.probet-sports.com
```

**Setup:**
```bash
# Build for staging
REACT_APP_ENV=staging npm run build

# Or edit src/config.ts:
case 'staging':
    return 'https://staging-api.probet-sports.com';
```

**Deploy to staging:**
```bash
# Upload build artifacts to staging server
# Run smoke tests
npm test
```

---

### Production Environment

**Configuration:**
```
Environment: production
API URL: https://api.probet-sports.com
Frontend URL: https://probet-sports.com
```

**Security Setup:**
- [ ] Enable HTTPS/TLS
- [ ] Configure CORS for production domain
- [ ] Set up API rate limiting
- [ ] Enable security headers
- [ ] Configure HSTS (HTTP Strict Transport Security)
- [ ] Set up monitoring and logging

**Setup:**
```bash
# Build for production
REACT_APP_ENV=production npm run build

# Set environment variables
PORT=3000
NODE_ENV=production
API_URL=https://api.probet-sports.com
```

---

## Post-Deployment

### Verification Steps

**Immediately after deploy:**

1. **Health Check:**
   ```bash
   curl https://api.probet-sports.com/api/health
   # Should return status: ok
   ```

2. **Test Frontend:**
   - Open https://probet-sports.com
   - Dismiss disclaimer
   - Verify page loads without console errors

3. **Test API Endpoints:**
   ```bash
   curl https://api.probet-sports.com/api/sports
   curl https://api.probet-sports.com/api/leagues/football
   curl https://api.probet-sports.com/api/matchups/football/epl
   ```

4. **Test Form:**
   - Fill form with test data
   - Submit form
   - Verify success message
   - Check browser Network tab

5. **Test Mobile:**
   - Open on mobile device or emulator
   - Verify responsive design works
   - Test form on mobile

---

### Monitoring Setup

**Log Monitoring:**
```bash
# Watch application logs
tail -f /var/log/probet-sports/app.log

# Search for errors
grep "ERROR" /var/log/probet-sports/app.log
```

**Error Tracking:**
- Set up error monitoring (Sentry, Rollbar)
- Get alerts for critical errors
- Track error rates

**Performance Monitoring:**
- Set up uptime monitoring
- Track API response times
- Monitor resource usage

---

### Backup Procedures

**Before deployment:**
```bash
# Backup current version
cp -r /var/www/probet-sports /var/www/probet-sports.backup.2026-01-27

# Backup database (if applicable)
mysqldump database_name > backup.sql
```

**Keep backups:**
- Keep at least last 5 deployments
- Store in secure location
- Document backup contents

---

## Rollback

### Quick Rollback

**If deployment breaks:**

```bash
# Restore from backup
rm -rf /var/www/probet-sports
cp -r /var/www/probet-sports.backup.2026-01-27 /var/www/probet-sports

# Restart services
systemctl restart probet-sports

# Verify
curl https://probet-sports.com/api/health
```

### Version Control Rollback

**Using Git:**
```bash
# See deployment history
git log --oneline | head -10

# Revert to previous version
git revert HEAD

# Or reset to specific commit
git reset --hard abc1234

# Deploy reverted code
npm run build
# Deploy new build
```

### Blue-Green Deployment

**For zero-downtime rollback:**

1. **Keep two environments:**
   - Blue (current production)
   - Green (new version)

2. **Deploy to Green:**
   - Build and deploy to green environment
   - Test thoroughly

3. **Switch traffic:**
   - If working: switch load balancer to Green
   - If broken: keep traffic on Blue

4. **Rollback:**
   - Switch load balancer back to Blue
   - Investigate issue in Green

---

## Deployment Automation

### GitHub Actions CI/CD

**Create `.github/workflows/deploy.yml`:**

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
        env:
          REACT_APP_ENV: production
      
      - name: Deploy to production
        run: |
          npm run build
          # Your deployment command here
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
```

---

## Common Deployment Issues

### Issue: API URL Not Updating

**Problem:** Production still uses localhost API URL

**Solution:**
1. Verify environment variable: `REACT_APP_ENV=production`
2. Check `src/config.ts` has correct production URL
3. Rebuild: `npm run build`
4. Clear CDN cache if using one

---

### Issue: 404 on API Endpoints

**Problem:** Frontend loads but API calls fail

**Solution:**
1. Verify API server is running: `ps aux | grep node`
2. Check API port: `netstat -ano | grep 3000`
3. Verify API URL in config: `config.get('apiBaseUrl')`
4. Check CORS settings in `server.js`

---

### Issue: Styles Not Loading

**Problem:** CSS not applied after deployment

**Solution:**
1. Verify `styles.css` is deployed
2. Check file paths are relative (not absolute)
3. Clear browser cache
4. Clear CDN cache if using CloudFront/CDN

---

### Issue: Form Persistence Not Working

**Problem:** Form data not saving/restoring

**Solution:**
1. Check localStorage is enabled in production
2. Verify no storage quota errors in console
3. Check HTTPS doesn't block storage (usually not an issue)
4. Test in DevTools → Application → Local Storage

---

## Deployment Checklist

### Before Deployment
- [ ] All tests pass
- [ ] No console errors
- [ ] TypeScript compiles
- [ ] Production build created
- [ ] Configuration set correctly
- [ ] Backup created
- [ ] Team notified

### During Deployment
- [ ] Monitor deployment progress
- [ ] Watch for errors in logs
- [ ] Check health endpoints
- [ ] Verify no 404 errors

### After Deployment
- [ ] Verify API endpoints work
- [ ] Test form submission
- [ ] Check mobile responsiveness
- [ ] Monitor error logs
- [ ] Get user feedback
- [ ] Document deployment notes

---

## Deployment Commands Reference

### Build
```bash
npm run build
```

### Test
```bash
npm test
```

### Verify Build
```bash
ls dist/
curl http://localhost:3000/api/health
```

### Deploy (varies by platform)
```bash
# Netlify
netlify deploy --prod

# Heroku
git push heroku main

# Docker
docker build -t probet-sports .
docker run -p 3000:3000 probet-sports
```

---

## Additional Resources

- [Node.js Hosting](https://nodejs.org/en/docs/guides/nodejs-web-apps/)
- [Docker Basics](https://docs.docker.com/get-started/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Environment Variables](https://12factor.net/config)

---

## Getting Help

- 📖 See [Setup Guide](SETUP.md)
- 🔧 See [Development Guide](DEVELOPMENT.md)
- 🆘 See [Troubleshooting Guide](TROUBLESHOOTING.md)

---

**Ready to deploy?** Check the [Pre-Deployment Checklist](#pre-deployment-checklist) →
