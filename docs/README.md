# ProBet Sports - Documentation Index

Welcome to the ProBet Sports documentation! This is your complete guide to understanding, developing, and deploying the automation testing form.

## 📚 Quick Navigation

### Getting Started
- **[Quick Start Guide](#quick-start)** - Get running in 5 minutes
- **[Setup & Installation](SETUP.md)** - Detailed setup instructions
- **[Configuration Guide](CONFIGURATION.md)** - Environment setup

### Understanding the Project
- **[Architecture Overview](ARCHITECTURE.md)** - How everything works together
- **[Project Structure](PROJECT_STRUCTURE.md)** - File organization
- **[API Reference](API_REFERENCE.md)** - Available endpoints and data

### Development
- **[Development Guide](DEVELOPMENT.md)** - Workflow and best practices
- **[Build Instructions](BUILD.md)** - Compilation and deployment
- **[Testing Guide](TESTING.md)** - Testing strategies and test attributes

### Features & Improvements
- **[Features Overview](FEATURES.md)** - Complete feature list
- **[Recent Improvements](IMPROVEMENTS_IMPLEMENTED.md)** - New features added
- **[Refactoring Details](REFACTORING.md)** - Architecture improvements

### Deployment & DevOps
- **[GitHub Setup](GITHUB_SETUP.md)** - Version control setup
- **[Deployment Guide](DEPLOYMENT.md)** - Production deployment
- **[Pre-deployment Checklist](PRE_GITHUB_CHECKLIST.md)** - Review before going live

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Build TypeScript
```bash
npm run build
```

### 3. Run Development Environment
```bash
npm run dev
```
This starts both the API server (port 3000) and frontend (port 8080)

### 4. Access the Application
Open your browser and go to: **http://localhost:8080**

---

## 🎯 Common Tasks

### I want to...

#### **Modify the form**
→ Edit `index.html` and `src/form.ts`  
→ See [Development Guide](DEVELOPMENT.md)

#### **Change styling**
→ Edit `styles.css` (uses CSS variables)  
→ See [Styling Guide](DEVELOPMENT.md#styling)

#### **Add a new API endpoint**
→ Edit `routes/betting-routes.js`  
→ Update `src/api-service.ts`  
→ See [API Reference](API_REFERENCE.md)

#### **Deploy to production**
→ Follow [Deployment Guide](DEPLOYMENT.md)  
→ Use [Pre-deployment Checklist](PRE_GITHUB_CHECKLIST.md)

#### **Run automated tests**
→ See [Testing Guide](TESTING.md)

#### **Change configuration**
→ Edit `src/config.ts` or create `.env`  
→ See [Configuration Guide](CONFIGURATION.md)

---

## 📋 Project Overview

### What is ProBet Sports?

ProBet Sports is a **sports betting form designed for automation testing and QA practice**. It's NOT a real betting platform - it's a realistic test environment with:

- ✅ Account registration form
- ✅ Dynamic cascading dropdowns (Sport → League → Matchup)
- ✅ Real-time payout calculation
- ✅ Comprehensive form validation
- ✅ API-driven backend
- ✅ Auto-save functionality
- ✅ Loading states and error handling
- ✅ Responsive design
- ✅ Complete test data attributes

### Key Technologies

| Layer | Tech | Version |
|-------|------|---------|
| **Frontend** | TypeScript, HTML5, CSS3 | Latest |
| **Backend** | Node.js, Express.js | v18+ |
| **Build** | TypeScript Compiler | v5+ |
| **Data** | JSON | - |

---

## 📊 Documentation Map

```
Getting Started
├── Quick Start (this page)
├── Setup & Installation
└── Configuration

Understanding
├── Architecture
├── Project Structure
└── API Reference

Development
├── Development Guide
├── Build Instructions
└── Testing Guide

Deployment
├── GitHub Setup
├── Deployment Guide
└── Checklist
```

---

## 🔧 System Requirements

| Requirement | Minimum | Recommended |
|------------|---------|-------------|
| Node.js | v14 | v18+ |
| npm | v6 | v9+ |
| RAM | 512MB | 2GB+ |
| Storage | 500MB | 1GB+ |
| Browser | Chrome 90+ | Latest |

---

## 💡 Key Features

### Form Features
- **Disclaimer Modal** - Blocks access until accepted
- **Account Information** - Name, email, password, country, DOB
- **Bet Placement** - Sport, league, matchup, bet type, amount, odds
- **Preferences** - Favorite sports, notifications
- **Validation** - Real-time and submit validation
- **Success Confirmation** - Detailed bet summary

### Technical Features
- **Auto-Save** - Form data saved every 2 seconds
- **Auto-Recovery** - Restore data if page refreshes
- **Loading States** - Visual feedback during API calls
- **Error Handling** - User-friendly error messages
- **API Dropdown** - Leagues and matchups loaded from server
- **Payout Calculator** - Real-time winnings calculation
- **Responsive Design** - Works on mobile, tablet, desktop

---

## 🆘 Getting Help

### Documentation Not Clear?
→ Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

### Want to Report an Issue?
→ Create a GitHub issue with details

### Have a Feature Request?
→ Submit a GitHub discussion

### Need Developer Support?
→ Check [DEVELOPMENT.md](DEVELOPMENT.md#troubleshooting)

---

## 📈 Project Statistics

| Metric | Value |
|--------|-------|
| TypeScript Files | 4 |
| JavaScript Files (Backend) | 4 |
| Total Lines of Code | ~2,000+ |
| Form Fields | 15+ |
| API Endpoints | 3 |
| CSS Variables | 25+ |
| Test Data Attributes | 40+ |

---

## 🎓 Learning Path

**New to the project?** Follow this path:

1. Read [Quick Start](#quick-start) (5 min)
2. Run the application locally (5 min)
3. Explore [Architecture Overview](ARCHITECTURE.md) (10 min)
4. Review [Project Structure](PROJECT_STRUCTURE.md) (10 min)
5. Check [Features Overview](FEATURES.md) (10 min)
6. Start [Development Guide](DEVELOPMENT.md) when ready

---

## 📝 Documentation Standards

All documentation in this project follows these standards:

- ✅ Clear, concise language
- ✅ Real code examples
- ✅ Step-by-step instructions
- ✅ Visual diagrams where helpful
- ✅ Cross-references to related docs
- ✅ Troubleshooting sections
- ✅ Up-to-date information

---

## 🔄 Documentation Updates

**Last Updated**: January 27, 2026  
**Maintained By**: Development Team  
**Latest Version**: 2.0

**Recent Updates**:
- Added Configuration Guide
- Added Improvements Implementation docs
- Expanded Architecture documentation
- Added comprehensive code examples

---

## 📞 Quick Reference

**Commands**:
```bash
npm install      # Install dependencies
npm run build    # Compile TypeScript
npm run watch    # Auto-compile on save
npm run server   # Start API server
npm run serve    # Start frontend server
npm run dev      # Start both (concurrently)
```

**Ports**:
- Frontend: `http://localhost:8080`
- API Server: `http://localhost:3000`
- API Endpoints: `http://localhost:3000/api/*`

**Files to Edit**:
- HTML: `index.html`
- Styles: `styles.css`
- Frontend Logic: `src/form.ts`
- Backend Routes: `routes/betting-routes.js`
- Configuration: `src/config.ts`

---

## 📜 License

This project is licensed under the **ISC License**. See [LICENSE](../LICENSE) file for details.

---

**Ready to get started?** Go to [Setup & Installation](SETUP.md) →
