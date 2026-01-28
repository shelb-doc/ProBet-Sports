# Project Architecture

## Architecture Overview

This document visualizes the refactored architecture of the automation test form application.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (Client)                     │
│                                                          │
│  ┌────────────┐  ┌─────────────┐  ┌──────────────────┐ │
│  │ index.html │──│  styles.css  │──│ dist/form.js     │ │
│  │            │  │  (Variables) │  │ (Compiled TS)    │ │
│  └────────────┘  └─────────────┘  └──────────────────┘ │
│                                            │             │
│                                            │             │
└────────────────────────────────────────────┼─────────────┘
                                             │
                                    HTTP/REST API
                                             │
┌────────────────────────────────────────────┼─────────────┐
│                   Server (Node.js)         │             │
│                                            │             │
│  ┌─────────────┐      ┌──────────────┐   │             │
│  │  server.js  │──────│   Routes     │───┘             │
│  │ (Main App)  │      │ betting-     │                 │
│  └─────────────┘      │ routes.js    │                 │
│         │             └──────────────┘                 │
│         │                      │                        │
│         ├──────────────────────┼────────────────┐      │
│         │                      │                 │      │
│  ┌──────────────┐    ┌─────────────┐   ┌────────────┐ │
│  │  Middleware  │    │    Data     │   │  Error     │ │
│  │  (Logging,   │    │  betting-   │   │  Handler   │ │
│  │  Validation) │    │  data.js    │   │            │ │
│  └──────────────┘    └─────────────┘   └────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### TypeScript Module Organization

```
src/ (TypeScript Source)
│
├── form.ts (Main Orchestrator)
│   │
│   ├── Uses: FormValidator
│   ├── Uses: BettingAPIService
│   └── Uses: PayoutCalculator
│
├── validators.ts (Validation Logic)
│   │
│   └── FormValidator
│       ├── validateRequired()
│       ├── validateEmail()
│       ├── validatePassword()
│       ├── validateAge()
│       └── validateBetAmount()
│
├── api-service.ts (API Communication)
│   │
│   └── BettingAPIService
│       ├── fetchLeagues()
│       ├── fetchMatchups()
│       ├── populateLeagues()
│       └── populateMatchups()
│
└── payout-calculator.ts (Utilities)
    │
    └── PayoutCalculator
        ├── calculatePayout()
        └── formatCurrency()

                ↓ TypeScript Compiler (tsc)

dist/ (Compiled JavaScript)
├── form.js
├── validators.js
├── api-service.js
└── payout-calculator.js
```

### Class Relationships

```
┌─────────────────────────┐
│  BettingFormHandler     │
│  (Main Orchestrator)    │
└─────────────────────────┘
           │
           ├──── uses ────┐
           │              │
    ┌──────▼──────┐  ┌───▼──────────┐
    │ FormValidator│  │ BettingAPI   │
    │              │  │ Service      │
    └──────────────┘  └──────────────┘
           │
           ├──── uses ────┐
           │              │
    ┌──────▼──────────────▼─┐
    │  PayoutCalculator     │
    │  (Static Utilities)   │
    └───────────────────────┘


┌─────────────────────────┐
│   ModalHandler          │
│   (Modal Management)    │
└─────────────────────────┘


┌─────────────────────────┐
│  DisclaimerHandler      │
│  (Disclaimer Modal)     │
└─────────────────────────┘
```

---

## Backend Architecture

### Server Module Organization

```
Server Entry Point (server.js)
│
├── Middleware Stack
│   ├── CORS
│   ├── JSON Parser
│   ├── URL Encoded Parser
│   └── Request Logger (dev only)
│
├── API Routes (/api)
│   │
│   └── Mounts: routes/betting-routes.js
│       │
│       ├── GET /sports
│       ├── GET /leagues/:sport
│       ├── GET /matchups/:sport/:league
│       └── GET /health
│       │
│       └── Uses Validation Middleware
│           ├── validateSport()
│           └── validateLeague()
│
├── Data Layer
│   │
│   └── data/betting-data.js
│       └── Sports, Leagues, Matchups
│
└── Error Handling
    │
    ├── 404 Handler (notFoundHandler)
    └── Error Middleware (errorHandler)
```

### Request Flow Diagram

```
Client Request
      │
      ▼
┌─────────────┐
│   CORS      │
└─────┬───────┘
      │
      ▼
┌─────────────┐
│   Logger    │
└─────┬───────┘
      │
      ▼
┌─────────────┐
│   Router    │──── Matches /api/*
└─────┬───────┘
      │
      ▼
┌─────────────┐
│  Validation │──── Validates params
│  Middleware │
└─────┬───────┘
      │
      ▼
┌─────────────┐
│Route Handler│──── Fetches from data
└─────┬───────┘
      │
      ├── Success ──► JSON Response
      │
      └── Error ────► Error Handler
                           │
                           ▼
                      JSON Error Response
```

---

## Data Flow

### Form Submission Flow

```
User fills form
      │
      ▼
[Submit Button Click]
      │
      ▼
┌─────────────────────┐
│ BettingFormHandler  │
│  .handleSubmit()    │
└──────────┬──────────┘
           │
           ▼
    ┌──────────────┐
    │ Clear Errors │
    └──────┬───────┘
           │
           ▼
┌──────────────────────┐
│  validateForm()      │
│  Uses FormValidator  │
└──────────┬───────────┘
           │
      Valid? ─── No ──► Show Errors
           │
          Yes
           │
           ▼
    ┌──────────────┐
    │Collect Data  │
    └──────┬───────┘
           │
           ▼
┌──────────────────────┐
│  displaySuccess()    │
│  Uses PayoutCalc     │
└──────────┬───────────┘
           │
           ▼
    [Show Success Message]
```

### API Call Flow

```
User selects sport
      │
      ▼
┌────────────────────┐
│ Sport Change Event │
└─────────┬──────────┘
          │
          ▼
┌────────────────────────┐
│ BettingAPIService      │
│  .fetchLeagues(sport)  │
└─────────┬──────────────┘
          │
          ▼
    fetch('/api/leagues/:sport')
          │
          ▼
┌─────────────────────┐
│  Server Validates   │
│  Returns Leagues    │
└─────────┬───────────┘
          │
          ▼
┌────────────────────────┐
│ BettingAPIService      │
│  .populateLeagues()    │
└─────────┬──────────────┘
          │
          ▼
    [Dropdown Updated]
```

---

## CSS Architecture

### CSS Variables Hierarchy

```
:root
│
├── Colors
│   ├── Primary Palette
│   │   ├── --color-primary
│   │   ├── --color-primary-dark
│   │   ├── --color-primary-light
│   │   └── --color-primary-hover
│   │
│   ├── Accent & Utility
│   │   ├── --color-accent
│   │   ├── --color-error
│   │   └── --color-white
│   │
│   └── Borders & Backgrounds
│       ├── --color-border
│       ├── --color-border-hover
│       └── --color-hover-bg
│
├── Spacing System
│   ├── --spacing-xs   (8px)
│   ├── --spacing-sm   (12px)
│   ├── --spacing-md   (15px)
│   ├── --spacing-lg   (20px)
│   ├── --spacing-xl   (30px)
│   └── --spacing-xxl  (40px)
│
├── Border Radius
│   ├── --radius-sm    (6px)
│   ├── --radius-md    (8px)
│   ├── --radius-lg    (12px)
│   ├── --radius-xl    (16px)
│   └── --radius-full  (50%)
│
├── Transitions
│   ├── --transition-fast      (0.2s)
│   ├── --transition-standard  (0.3s)
│   └── --transition-slow      (0.4s)
│
├── Shadows
│   ├── --shadow-sm
│   ├── --shadow-md
│   ├── --shadow-lg
│   ├── --shadow-xl
│   └── --shadow-hover
│
└── Gradients
    ├── --gradient-primary
    ├── --gradient-primary-hover
    └── --gradient-light
```

### Component Hierarchy

```
body (Animated gradient background)
│
└── .container
    │
    ├── .logo-section (Header)
    │   └── Sports icons background
    │
    └── form#registrationForm
        │
        ├── .section-title (Account Info)
        │   └── input/select elements
        │
        ├── .section-title (Bet Placement)
        │   ├── Dynamic dropdowns
        │   ├── Radio buttons (.radio-group)
        │   └── Payout display
        │
        ├── .section-title (Preferences)
        │   └── Checkboxes (.checkbox-group)
        │
        └── .form-actions
            ├── .btn-submit
            └── .btn-reset
```

---

## Dependency Graph

### Frontend Dependencies

```
index.html
    │
    ├──► styles.css
    │      └── Uses CSS Variables
    │
    └──► dist/form.js
           │
           ├──► dist/validators.js
           │      └── FormValidator class
           │
           ├──► dist/api-service.js
           │      └── BettingAPIService class
           │
           └──► dist/payout-calculator.js
                  └── PayoutCalculator class
```

### Backend Dependencies

```
server.js
    │
    ├──► express
    │      └── Framework
    │
    ├──► cors
    │      └── CORS middleware
    │
    ├──► routes/betting-routes.js
    │      │
    │      └──► data/betting-data.js
    │
    └──► middleware/error-handler.js
           ├── errorHandler
           └── notFoundHandler
```

---

## Build Process

```
Source Files                 Build Tool              Output Files

src/*.ts         ──────►   TypeScript    ──────►   dist/*.js
                           Compiler (tsc)           (ES2020)

                           ┌──────────┐
                           │tsconfig  │
                           │.json     │
                           └──────────┘

Features:
├── Source Maps (*.js.map)
├── Type Declarations (*.d.ts)
├── Declaration Maps (*.d.ts.map)
└── Strict Type Checking
```

---

## Module System

### TypeScript/JavaScript Modules

```
ES2020 Modules (export/import)

validators.ts
    export class FormValidator { ... }

api-service.ts
    export class BettingAPIService { ... }

payout-calculator.ts
    export class PayoutCalculator { ... }

form.ts
    import { FormValidator } from './validators'
    import { BettingAPIService } from './api-service'
    import { PayoutCalculator } from './payout-calculator'
```

### Node.js Modules (Server)

```
CommonJS Modules (module.exports/require)

betting-data.js
    module.exports = { ... }

betting-routes.js
    const bettingData = require('../data/betting-data')
    module.exports = router

error-handler.js
    module.exports = { errorHandler, notFoundHandler }

server.js
    const bettingRoutes = require('./routes/betting-routes')
    const { errorHandler } = require('./middleware/error-handler')
```

---

## Security Layers

```
Client-Side Security
├── Input Validation (FormValidator)
├── HTML Escaping (escapeHtml method)
├── No inline handlers (CSP friendly)
└── Client-side rate limiting (potential)

Server-Side Security
├── CORS Configuration
├── Input Validation Middleware
├── Error Message Sanitization
├── Parameter Validation
└── Graceful Error Handling
```

---

## Performance Optimizations

### Current Optimizations
- ✅ Modular code (code splitting potential)
- ✅ Reduced duplication
- ✅ Event delegation where possible
- ✅ Efficient DOM queries (cached elements)

### Future Optimizations
- Bundle optimization (Webpack/Rollup)
- Code splitting
- Lazy loading
- Caching strategies
- CDN for static assets

---

## Scalability Considerations

### Horizontal Scaling
```
Load Balancer
      │
      ├──► Server Instance 1
      ├──► Server Instance 2
      └──► Server Instance 3
             │
             └──► Shared Database
                  (Future enhancement)
```

### Vertical Scaling
- Add database layer
- Add caching layer (Redis)
- Add session management
- Add authentication service

---

## Testing Architecture (Recommended)

```
Unit Tests
├── validators.test.ts
│   └── Test FormValidator methods
├── api-service.test.ts
│   └── Test API calls (mocked)
└── payout-calculator.test.ts
    └── Test calculations

Integration Tests
├── form-integration.test.ts
│   └── Test form workflow
└── api-integration.test.ts
    └── Test API endpoints

E2E Tests
└── form-e2e.test.ts
    └── Test full user journey
```

---

## Deployment Architecture

```
Development
├── Local Server (npm run server)
├── Watch Mode (npm run watch)
└── Dev Server (npm run serve)

Production
├── Build Assets (npm run build)
├── Minify/Bundle
├── Deploy Server
│   ├── Process Manager (PM2)
│   ├── Reverse Proxy (Nginx)
│   └── SSL/TLS
└── Deploy Static Files
    ├── CDN
    └── Caching Headers
```

---

## Summary

This architecture provides:

- ✅ **Separation of Concerns**: Clear boundaries between layers
- ✅ **Modularity**: Independent, reusable components
- ✅ **Scalability**: Easy to extend and scale
- ✅ **Maintainability**: Clear structure, easy to navigate
- ✅ **Testability**: Isolated units, easy to test
- ✅ **Security**: Multiple layers of validation
- ✅ **Performance**: Optimized code organization

The refactored architecture follows industry best practices and is production-ready with room for future enhancements.
