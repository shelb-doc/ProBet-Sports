# Setup & Installation Guide

Complete step-by-step instructions for setting up ProBet Sports on your machine.

## Table of Contents
- [System Requirements](#system-requirements)
- [Installation Steps](#installation-steps)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

---

## System Requirements

### Required Software

| Software | Minimum | Recommended | Download |
|----------|---------|-------------|----------|
| **Node.js** | v14.0.0 | v18.0.0+ | https://nodejs.org |
| **npm** | v6.0.0 | v9.0.0+ | Included with Node.js |
| **Git** | v2.30.0 | Latest | https://git-scm.com |
| **Browser** | Chrome 90+ | Latest Chrome/Firefox | - |
| **Terminal** | - | bash/PowerShell | Built-in |

### System Resources

| Resource | Minimum | Recommended |
|----------|---------|-------------|
| **RAM** | 512 MB | 2 GB+ |
| **Disk Space** | 500 MB | 1 GB+ |
| **CPU** | Dual-core | Quad-core+ |
| **Internet** | Required for initial setup | Broadband |

### Supported Operating Systems

- ✅ **Windows** 10 / 11
- ✅ **macOS** 10.13+
- ✅ **Linux** (Ubuntu 18.04+, Debian 10+, etc.)

---

## Installation Steps

### Step 1: Install Node.js

**Windows & macOS:**
1. Go to https://nodejs.org
2. Download the **LTS (Long-Term Support)** version
3. Run the installer and follow the prompts
4. Accept all default settings
5. Restart your terminal/PowerShell

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verify Installation:**
```bash
node --version
npm --version
```

Expected output:
```
v18.x.x or higher
9.x.x or higher
```

---

### Step 2: Clone or Download the Project

**Option A: Using Git (Recommended)**

```bash
git clone https://github.com/YOUR_USERNAME/automation-test-form.git
cd automation-test-form
```

**Option B: Download ZIP**

1. Visit the repository on GitHub
2. Click **Code** → **Download ZIP**
3. Extract the ZIP file
4. Open terminal in the extracted folder

---

### Step 3: Install Dependencies

Navigate to the project directory and install dependencies:

```bash
npm install
```

**What this does:**
- Downloads and installs Express.js server framework
- Installs CORS middleware for API requests
- Installs TypeScript compiler
- Installs development tools (concurrently, etc.)

**Expected output:**
```
up to date, audited 45 packages in 2s
```

**Installation time:** 1-2 minutes depending on internet speed

---

### Step 4: Build the Project

Compile TypeScript files to JavaScript:

```bash
npm run build
```

**What this does:**
- Compiles `src/form.ts` → `dist/form.js`
- Compiles `src/validators.ts` → `dist/validators.js`
- Compiles `src/api-service.ts` → `dist/api-service.js`
- Compiles `src/config.ts` → `dist/config.js`
- Compiles `src/payout-calculator.ts` → `dist/payout-calculator.js`

**Expected output:**
```
No errors (clean compilation)
```

**Note:** If you see errors, see [Troubleshooting](#troubleshooting) section.

---

### Step 5: Verify Installation

Run the verification checks:

```bash
npm run build
echo "✓ Build successful"

# Check if dist files exist
ls dist/
# Should show: form.js, validators.js, api-service.js, etc.
```

---

## Verification

### Check Everything is Working

#### 1. Verify Node.js & npm
```bash
node --version    # Should be v14+
npm --version     # Should be v6+
npm list          # Shows installed packages
```

#### 2. Verify TypeScript Compilation
```bash
npm run build
# Should show no errors
# Check dist/ folder exists with .js files
```

#### 3. Verify Project Structure
```bash
# Verify key files exist:
# - index.html
# - styles.css
# - server.js
# - src/ folder with .ts files
# - dist/ folder with .js files
```

#### 4. Quick Run Test
```bash
# Terminal 1: Start the API server
npm run server
# Should output: "🎲 Betting API Server running on http://localhost:3000"

# Terminal 2: Start the frontend (in another terminal)
npm run serve
# Should output: "Hit CTRL-C to stop the server"

# Then open browser to: http://localhost:8080
```

---

## Troubleshooting

### Issue: Node.js Not Installed

**Error Message:**
```
'node' is not recognized as an internal or external command
```

**Solution:**
1. Download and install Node.js from https://nodejs.org
2. **Restart your terminal** (important!)
3. Verify: `node --version`

---

### Issue: npm Install Fails

**Error Message:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**

**Option 1:** Clear npm cache and retry
```bash
npm cache clean --force
npm install
```

**Option 2:** Use legacy dependency resolver
```bash
npm install --legacy-peer-deps
```

**Option 3:** Delete node_modules and retry
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### Issue: TypeScript Compilation Fails

**Error Message:**
```
error TS2307: Cannot find module 'module-name'
```

**Solutions:**

1. **Rebuild dependencies:**
   ```bash
   rm -rf node_modules
   npm install
   npm run build
   ```

2. **Check for syntax errors:**
   - Look at error message carefully
   - It shows file and line number
   - Fix the syntax error

3. **Check TypeScript version:**
   ```bash
   npm list typescript
   # Should be v5.3.3 or higher
   ```

---

### Issue: Port Already in Use

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

**Option 1:** Find and stop the process using the port

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
lsof -i :3000
kill -9 <PID>
```

**Option 2:** Use different port

Edit `server.js`:
```javascript
const PORT = process.env.PORT || 3001; // Change 3000 to 3001
```

---

### Issue: Browser Can't Connect to API

**Error Message:**
```
Failed to fetch
CORS error
Connection refused
```

**Solutions:**

1. **Verify API server is running:**
   ```bash
   npm run server
   # Should show "🎲 Betting API Server running"
   ```

2. **Check correct URL:**
   - Frontend: http://localhost:8080
   - API: http://localhost:3000/api

3. **Verify CORS settings:**
   - Check `server.js` has `cors()` middleware
   - Confirm `index.html` loads correctly

4. **Clear browser cache:**
   - Press `Ctrl+Shift+Delete`
   - Clear cached data
   - Refresh page

---

### Issue: Styles Not Loading

**Error Message:**
```
Styles look broken/plain
Layout is wrong
```

**Solutions:**

1. **Clear browser cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

2. **Check CSS file is served:**
   - DevTools → Network tab
   - Look for `styles.css` request
   - Should be Status 200

3. **Verify CSS file exists:**
   ```bash
   ls styles.css
   # File should exist in root directory
   ```

---

### Issue: Form Fields Not Working

**Error Message:**
```
Form won't validate
Buttons don't respond
Dropdowns don't populate
```

**Solutions:**

1. **Check JavaScript is loaded:**
   - DevTools → Console tab
   - Look for errors (red text)

2. **Verify dist/form.js exists:**
   ```bash
   npm run build
   ls dist/form.js
   ```

3. **Check HTML references correct file:**
   ```html
   <!-- In index.html, should have: -->
   <script src="dist/form.js"></script>
   ```

4. **Check browser console for errors:**
   - Press `F12` to open DevTools
   - Click **Console** tab
   - Look for red error messages

---

## Next Steps

Once verification is complete:

1. **Configure Environment** (Optional)
   - See [Configuration Guide](CONFIGURATION.md)
   - Set up API endpoints if needed

2. **Start Development**
   - See [Development Guide](DEVELOPMENT.md)
   - Make your first changes

3. **Learn the Architecture**
   - Read [Architecture Overview](ARCHITECTURE.md)
   - Understand the codebase

4. **Run Tests**
   - See [Testing Guide](TESTING.md)
   - Validate your changes

---

## Common Paths

### For Development
```bash
npm run dev  # Starts both servers
# Then edit files in src/ and styles.css
```

### For Production Deployment
```bash
npm run build  # Compile production build
# Deploy dist/ files to server
```

### For Continuous Development
```bash
npm run watch  # Auto-compile on file save
# Edit files, changes auto-compile
```

---

## System Validation Checklist

- [ ] Node.js installed (v14+)
- [ ] npm installed (v6+)
- [ ] Project cloned/downloaded
- [ ] `npm install` completed
- [ ] `npm run build` completed successfully
- [ ] `dist/` folder contains .js files
- [ ] API server starts (`npm run server`)
- [ ] Frontend server starts (`npm run serve`)
- [ ] Browser can access `http://localhost:8080`
- [ ] Form loads without errors
- [ ] Browser console has no error messages

---

## Performance Tips

### Speed Up Installation
```bash
# Use npm ci instead of install (faster for CI/CD)
npm ci

# Or use npm install with legacy resolver
npm install --legacy-peer-deps
```

### Speed Up Development
```bash
# Use watch mode to auto-compile
npm run watch

# Make changes - they auto-compile
# Just refresh browser to see changes
```

---

## Getting More Help

- 📖 See [Documentation Index](README.md)
- 🔧 See [Development Guide](DEVELOPMENT.md)
- 🆘 See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- 🐛 Report issues on GitHub
- 💬 Ask questions in GitHub Discussions

---

**Ready?** Go to [Configuration Guide](CONFIGURATION.md) or [Development Guide](DEVELOPMENT.md) →
