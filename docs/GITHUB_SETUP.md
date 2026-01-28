# GitHub Setup Guide

This guide will help you upload your automation test form project to GitHub.

## Prerequisites

- Git installed on your computer
- GitHub account created at [github.com](https://github.com)

---

## Step 1: Initialize Git Repository (If Not Already Done)

Open your terminal in the project directory and run:

```bash
cd c:\Users\Shelby\automation-test-form
git init
```

## Step 2: Add Your Files

Add all files to git (the .gitignore will exclude node_modules and dist):

```bash
git add .
```

Check what will be committed:

```bash
git status
```

You should see all your files except:
- `node_modules/` (ignored)
- `dist/` (ignored - will be built from source)
- `*.bak` files (ignored)

## Step 3: Create Your First Commit

```bash
git commit -m "Initial commit: Sports betting automation test form with refactored architecture"
```

## Step 4: Create a GitHub Repository

### Option A: Using GitHub Website

1. Go to [github.com](https://github.com) and log in
2. Click the **+** icon in top right → **New repository**
3. Fill in:
   - **Repository name**: `automation-test-form`
   - **Description**: "Sports betting form for automation testing practice with TypeScript and Express API"
   - **Visibility**: Choose **Public** or **Private**
   - **DO NOT** check "Initialize with README" (you already have one)
4. Click **Create repository**

### Option B: Using GitHub CLI (if installed)

```bash
gh repo create automation-test-form --public --source=. --remote=origin
```

## Step 5: Connect Your Local Repository to GitHub

Copy the commands from GitHub's quick setup page, or use these (replace YOUR_USERNAME):

```bash
git remote add origin https://github.com/YOUR_USERNAME/automation-test-form.git
git branch -M main
git push -u origin main
```

## Step 6: Verify Upload

1. Go to your repository on GitHub
2. You should see all your files
3. Verify that `node_modules/` and `dist/` are NOT uploaded (they should be ignored)

---

## GitHub Repository Settings

### Recommended Settings

1. **About Section** (top right of your repo):
   - Description: "Sports betting form for automation testing practice"
   - Website: (optional) GitHub Pages URL if you deploy
   - Topics: `automation-testing`, `typescript`, `express`, `test-automation`, `qa`

2. **README.md**:
   - The current README.md will display on your repository homepage
   - Consider replacing it with README-updated.md:
   ```bash
   mv README.md README-old.md
   mv README-updated.md README.md
   git add .
   git commit -m "Update README with refactored structure"
   git push
   ```

---

## Setting Up GitHub Pages (Optional)

To host the frontend on GitHub Pages:

### 1. Create a gh-pages branch

```bash
git checkout -b gh-pages
```

### 2. Build the project

```bash
npm run build
```

### 3. Force add dist folder (it's normally ignored)

```bash
git add -f dist/
git commit -m "Add compiled JavaScript for GitHub Pages"
git push origin gh-pages
```

### 4. Enable GitHub Pages

1. Go to your repository → **Settings**
2. Scroll to **Pages** section
3. Under **Source**, select branch: `gh-pages`
4. Click **Save**
5. Your site will be available at: `https://YOUR_USERNAME.github.io/automation-test-form/`

**Note**: The API server won't work on GitHub Pages (frontend only). For full functionality, deploy the server separately.

---

## Deploying the Full Application

### Option 1: Heroku (Frontend + Backend)

1. Create a `Procfile`:
```bash
echo "web: node server.js" > Procfile
git add Procfile
git commit -m "Add Procfile for Heroku"
```

2. Deploy to Heroku:
```bash
heroku create your-app-name
git push heroku main
```

### Option 2: Render.com (Free tier available)

1. Go to [render.com](https://render.com)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run server`
5. Click **Create Web Service**

### Option 3: Vercel (Frontend) + Backend separately

**Frontend on Vercel**:
```bash
vercel
```

**Backend on Railway, Fly.io, or similar**

---

## Keeping Your Repository Updated

### After making changes:

```bash
# Check what changed
git status

# Add changed files
git add .

# Commit with a message
git commit -m "Description of changes"

# Push to GitHub
git push
```

### Common Git Commands

```bash
# See commit history
git log --oneline

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Pull latest changes
git pull

# See remote repository URL
git remote -v
```

---

## Adding Collaborators

1. Go to your repository on GitHub
2. Click **Settings** → **Collaborators**
3. Click **Add people**
4. Enter their GitHub username or email

---

## Repository Badges (Optional)

Add badges to your README for a professional look:

```markdown
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
```

---

## Protecting Your Main Branch

1. Go to **Settings** → **Branches**
2. Click **Add rule**
3. Set branch name pattern: `main`
4. Check:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass

---

## .gitignore Explanation

The `.gitignore` file excludes:

```
node_modules/     # npm packages (large, should be installed locally)
dist/             # Compiled code (generated from src/)
*.bak             # Backup files
.env              # Environment variables (may contain secrets)
.vscode/          # IDE settings (personal preference)
*.log             # Log files
```

These will be rebuilt/regenerated when others clone your repo.

---

## Clone Your Repository (for testing)

Test that others can use your project:

```bash
# Clone to a different directory
cd ~/Desktop
git clone https://github.com/YOUR_USERNAME/automation-test-form.git
cd automation-test-form

# Install and build
npm install
npm run build
npm run server
```

---

## Troubleshooting

### "Permission denied" error

Set up SSH keys or use HTTPS with personal access token:
- [GitHub SSH Setup](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

### "Large files" warning

If you accidentally committed node_modules:
```bash
git rm -r --cached node_modules
git commit -m "Remove node_modules from git"
git push
```

### Files not being ignored

```bash
# Remove from git but keep locally
git rm -r --cached dist/
git commit -m "Remove dist from git"
git push
```

---

## Next Steps After Uploading

1. ✅ Add repository description and topics
2. ✅ Update README.md with refactored structure
3. ✅ Add LICENSE file (ISC license recommended)
4. ✅ Create GitHub Issues for future improvements
5. ✅ Set up GitHub Actions for CI/CD (optional)
6. ✅ Deploy to a hosting platform
7. ✅ Share with the community!

---

## Sample Repository Description

**Short description**:
```
Sports betting form for automation testing practice with TypeScript and Express API
```

**Topics to add**:
- automation-testing
- test-automation
- typescript
- express
- nodejs
- qa-testing
- selenium
- playwright
- testing-tools
- form-validation

---

## Questions?

- GitHub Docs: https://docs.github.com
- Git Docs: https://git-scm.com/doc
- This project's documentation: See REFACTORING.md, BUILD.md, ARCHITECTURE.md

Happy coding! 🚀
