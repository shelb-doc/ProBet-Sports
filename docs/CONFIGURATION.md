# Configuration Guide

## Overview

ProBet Sports uses environment-based configuration to support development, staging, and production environments. Configuration is automatically detected based on the deployment environment, but can be manually overridden.

## Configuration System

The configuration system (`src/config.ts`) provides:

- **Automatic environment detection** based on hostname
- **Environment-specific API endpoints**
- **Configurable logging** (enabled in dev, disabled in prod)
- **Auto-save functionality toggle**
- **Centralized configuration management**

## Environment Detection

Configuration is determined in the following order:

1. **Explicit environment variable** (`REACT_APP_ENV` or `ENV`)
2. **Hostname detection**:
   - `probet-sports.com` or `www.probet-sports.com` → Production
   - Hostnames with "staging" → Staging
   - Hostnames with "prod" → Production
   - Localhost or local IPs → Development
3. **Default**: Development

## API Endpoints

The system automatically configures the API base URL based on environment:

### Development
```
http://localhost:3000/api
```
- Used for local development
- Connects to local API server running on port 3000

### Staging
```
https://staging-api.probet-sports.com
```
- Update this URL to your actual staging API endpoint
- Used for testing before production

### Production
```
https://api.probet-sports.com
```
- Update this URL to your actual production API endpoint
- For live deployments

## How to Configure

### Option 1: Automatic (Recommended)

Deploy to the appropriate hostname and configuration is automatically detected:

```bash
# For development (localhost)
npm run server
npm run serve
# Automatically uses http://localhost:3000/api

# For production
# Deploy to probet-sports.com
# Automatically uses https://api.probet-sports.com
```

### Option 2: Manual Override

Create a `.env` file in the project root:

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your custom values
REACT_APP_ENV=staging
REACT_APP_API_BASE_URL=https://custom-api.example.com
```

### Option 3: Runtime Configuration

Set environment variables before building:

```bash
# Build for production
REACT_APP_ENV=production npm run build

# Build for staging  
REACT_APP_ENV=staging npm run build

# Serve locally
npm run server
```

## Available Configuration

### API Base URL

**Key**: `apiBaseUrl`

```typescript
const url = config.get('apiBaseUrl');
// Returns: 'http://localhost:3000/api' (in development)
```

**Update Production/Staging URLs**:

Edit `src/config.ts` in the `getApiBaseUrl()` method:

```typescript
case 'production':
    return 'https://your-prod-api.com';  // ← Update this

case 'staging':
    return 'https://your-staging-api.com';  // ← Update this
```

### Environment

**Key**: `environment`

```typescript
const env = config.get('environment');
// Returns: 'development' | 'staging' | 'production'
```

### API Timeout

**Key**: `apiTimeout`

```typescript
const timeout = config.get('apiTimeout');
// Returns: 10000 (milliseconds)
```

### Logging

**Key**: `enableLogging`

```typescript
const loggingEnabled = config.get('enableLogging');
// Returns: true in development, false in production
```

### Auto-Save

**Key**: `enableAutoSave`

```typescript
const autoSaveEnabled = config.get('enableAutoSave');
// Returns: true
```

## Using Configuration in Code

### Accessing Config

```typescript
import { config, getConfig } from './config';

// Method 1: Get specific value
const apiUrl = config.get('apiBaseUrl');

// Method 2: Get all config
const allConfig = getConfig();
console.log(allConfig.environment);
```

### Logging

The config system provides structured logging with environment awareness:

```typescript
import { config, logConfig, errorConfig } from './config';

// Logs only in development
config.log('Loading data', { userId: 123 });

// Always logs (use for errors)
config.error('API request failed', error);

// Using utility functions
logConfig('Form submitted');
errorConfig('Network timeout');
```

### In API Service

Already configured in `src/api-service.ts`:

```typescript
import { config } from './config';

export class BettingAPIService {
    constructor() {
        this.apiBaseUrl = config.get('apiBaseUrl');
        config.log('API Service initialized', { url: this.apiBaseUrl });
    }
    
    async fetchLeagues(sport: string) {
        const url = `${this.apiBaseUrl}/leagues/${sport}`;
        config.log('Fetching leagues', { sport, url });
        // ...
    }
}
```

## Development Workflow

### Local Development

```bash
# 1. Start API server (if needed)
npm run server
# Runs on http://localhost:3000

# 2. Start development server
npm run serve
# Automatically connects to http://localhost:3000/api

# 3. View console logs (development logging enabled)
# Browser DevTools → Console tab
```

### Staging Deployment

```bash
# Update staging API URL in src/config.ts
# Then deploy:

npm run build

# Deploy build/ directory to staging environment
# Hostname containing "staging" will auto-configure
```

### Production Deployment

```bash
# Update production API URL in src/config.ts
# Then deploy:

REACT_APP_ENV=production npm run build

# Deploy dist/ directory to production
# probet-sports.com hostname will auto-configure
```

## Troubleshooting

### Wrong API Endpoint Being Used

Check browser console for configuration log:

```javascript
// In DevTools console, should show:
// [ProBet] Configuration loaded {
//   environment: "development",
//   apiBaseUrl: "http://localhost:3000/api",
//   apiTimeout: 10000
// }
```

**Solution**: 
- Verify hostname or set `REACT_APP_ENV` explicitly
- Check `src/config.ts` for correct URL mappings

### API Calls Failing

1. Check DevTools Network tab for actual request URL
2. Verify the API service logs in console:
   ```
   [ProBet] Fetching leagues {sport: "football", url: "..."}
   ```
3. Ensure API server is running on correct port
4. Check CORS settings if using different domain

### Logging Not Showing

In production, logging is disabled by default. To enable:

```typescript
// Temporarily in src/config.ts
enableLogging: true  // Change from environment check
```

## Security Considerations

⚠️ **Important**: 

- **Never commit sensitive credentials** to version control
- Use `.env` file for local secrets (already in `.gitignore`)
- For production, use secure environment variable management (CI/CD secrets)
- API URLs can be public (they're sent in HTTP requests anyway)
- Sensitive data (passwords, tokens) should go in backend, not config

## Best Practices

1. ✅ Use `config.get()` for accessing configuration
2. ✅ Use `config.log()` for environment-aware logging  
3. ✅ Keep sensitive config in backend environment variables
4. ✅ Test with correct API endpoints before deploying
5. ✅ Use consistent hostname patterns for auto-detection
6. ❌ Don't hardcode URLs in multiple places
7. ❌ Don't commit `.env` file with real values
8. ❌ Don't log sensitive data in production

## Examples

### Example: Add New Configuration

**In `src/config.ts`**:

```typescript
interface Config {
    // ... existing
    maxRetries: number;  // ← Add new field
}

private loadConfig(): Config {
    return {
        // ... existing
        maxRetries: this.config.environment === 'production' ? 3 : 5
    };
}
```

**Usage**:

```typescript
const maxRetries = config.get('maxRetries');
```

### Example: Conditional Logic Based on Environment

```typescript
if (config.get('environment') === 'production') {
    // Hide debug tools
    debugPanel.style.display = 'none';
} else {
    // Show debug tools
    debugPanel.style.display = 'block';
}
```

---

**Last Updated**: January 27, 2026  
**Maintained By**: Development Team
