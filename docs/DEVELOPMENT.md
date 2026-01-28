# Development Guide

Complete guide for developing, testing, and maintaining ProBet Sports.

## Table of Contents
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Best Practices](#best-practices)
- [Debugging](#debugging)
- [Testing](#testing)
- [Performance](#performance)

---

## Development Setup

### Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development environment
npm run dev

# This starts:
# - API server on http://localhost:3000
# - Frontend on http://localhost:8080
```

### Available Commands

```bash
npm run build     # Compile TypeScript to JavaScript
npm run watch     # Auto-compile on file changes
npm run server    # Start API server only
npm run serve     # Start frontend server only
npm run dev       # Start both servers (recommended)
```

### IDE Setup

**Recommended:** VS Code

**Extensions to Install:**
- TypeScript Vue Plugin
- ESLint
- Prettier
- REST Client (for API testing)
- Live Server (optional)

---

## Project Structure

### File Organization

```
src/
├── form.ts                 # Main form handler (entry point)
├── validators.ts           # Form validation logic
├── api-service.ts          # API communication
├── config.ts               # Environment configuration
└── payout-calculator.ts    # Bet payout calculations

routes/
└── betting-routes.js       # API endpoint definitions

middleware/
└── error-handler.js        # Error handling middleware

data/
└── betting-data.js         # Sports/leagues/matchups data

Root:
├── index.html              # HTML structure
├── styles.css              # Styling (with CSS variables)
├── server.js               # Express server setup
└── package.json            # Dependencies & scripts
```

### Understanding Each File

#### `src/form.ts` - Main Form Handler
**Responsibilities:**
- Initialize form handlers
- Manage form validation
- Handle form submission
- Manage loading states
- Handle API errors
- Save/restore form data

**Key Classes:**
```typescript
class BettingFormHandler {
    // Initializes form listeners
    private initialize(): void
    
    // Validates all form fields
    private validateForm(): boolean
    
    // Saves form data to localStorage
    private saveFormData(): void
    
    // Restores form data from localStorage
    private restoreFormData(): void
    
    // Shows loading spinner
    private showLoader(loaderId: string): void
    
    // Shows API error messages
    private showApiError(fieldName: string, message: string): void
}
```

#### `src/validators.ts` - Validation Logic
**Validates:**
- Required fields
- Email format
- Password strength (8+ chars)
- Age (18+)
- Bet amount (positive, min/max)
- Odds format

**Usage:**
```typescript
const validator = new FormValidator();
const result = validator.validateEmail('user@example.com');
if (!result.isValid) {
    console.log(result.message);
}
```

#### `src/api-service.ts` - API Communication
**Endpoints:**
- `GET /api/leagues/:sport` - Get leagues for a sport
- `GET /api/matchups/:sport/:league` - Get matchups for a league

**Usage:**
```typescript
const apiService = new BettingAPIService();
const leagues = await apiService.fetchLeagues('football');
apiService.populateLeagues(leagues);
```

#### `src/config.ts` - Configuration
**Features:**
- Auto-detects environment (dev/staging/prod)
- Configures API endpoints
- Provides logging utilities
- Manages application settings

**Usage:**
```typescript
import { config } from './config';

const apiUrl = config.get('apiBaseUrl');
config.log('Form submitted', { data });
config.error('API failed', error);
```

#### `server.js` - API Server
**Responsibilities:**
- Start Express server
- Mount API routes
- Apply middleware
- Handle errors
- Log requests

#### `index.html` - HTML Structure
**Sections:**
- Disclaimer modal
- Account information form
- Bet placement section
- Preferences
- Terms and conditions
- Success confirmation

---

## Making Changes

### Adding a New Form Field

**Step 1: Add HTML**
```html
<div class="form-group">
    <label for="newField">New Field *</label>
    <input 
        type="text" 
        id="newField" 
        name="newField"
        data-testid="new-field-input"
        required
    />
    <span class="error-message" data-testid="new-field-error"></span>
</div>
```

**Step 2: Add to TypeScript Interface**
```typescript
interface BetFormData {
    // ... existing fields
    newField: string;  // ← Add this
}
```

**Step 3: Add Validation**
```typescript
private validateForm(): boolean {
    const validations = [
        // ... existing validations
        { 
            value: this.getInputValue('newField'), 
            validator: () => this.validator.validateRequired(
                this.getInputValue('newField'), 
                'New Field'
            ), 
            errorId: 'new-field-error' 
        }
    ];
    // ... rest of validation
}
```

**Step 4: Add to Form Collection**
```typescript
private collectFormData(): BetFormData {
    return {
        // ... existing fields
        newField: this.getInputValue('newField')  // ← Add this
    };
}
```

**Step 5: Add to Form Restoration** (if persistence needed)
```typescript
private populateFormWithData(data: BetFormData): void {
    // ... existing fields
    this.setInputValue('newField', data.newField);  // ← Add this
}
```

### Modifying Styling

**Edit `styles.css`** using CSS variables:

```css
/* Use existing variables */
.my-element {
    color: var(--color-primary);
    padding: var(--spacing-lg);
    border-radius: var(--radius-md);
}

/* Or create new ones */
:root {
    --my-new-color: #123456;
}

.my-element {
    background: var(--my-new-color);
}
```

### Adding a New API Endpoint

**Step 1: Add Route in `routes/betting-routes.js`**
```javascript
router.get('/api/new-endpoint', (req, res) => {
    try {
        const data = { /* response data */ };
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

**Step 2: Add Method in `src/api-service.ts`**
```typescript
async fetchNewData(param: string): Promise<any[]> {
    try {
        const url = `${this.apiBaseUrl}/new-endpoint?param=${param}`;
        config.log('Fetching new data', { url });

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        return await response.json();
    } catch (error) {
        config.error('Error fetching new data', error);
        throw error;
    }
}
```

**Step 3: Use in `src/form.ts`**
```typescript
const data = await this.apiService.fetchNewData('value');
this.handleNewData(data);
```

### Modifying Configuration

**Edit `src/config.ts`**:

```typescript
interface Config {
    // ... existing fields
    maxBetAmount: number;  // ← Add new field
}

private loadConfig(): Config {
    return {
        // ... existing
        maxBetAmount: this.config.environment === 'production' ? 10000 : 1000
    };
}
```

**Use in code:**
```typescript
const maxBet = config.get('maxBetAmount');
```

---

## Best Practices

### Code Style

**TypeScript:**
- Use meaningful variable names
- Add comments for complex logic
- Use interfaces for data structures
- Handle errors explicitly

**CSS:**
- Use CSS variables for colors and spacing
- Keep selectors specific (avoid global overrides)
- Use semantic class names
- Mobile-first responsive design

**HTML:**
- Add `data-testid` attributes for all interactive elements
- Use semantic HTML tags
- Keep structure clean and organized

### Error Handling

**Always handle errors:**
```typescript
try {
    const data = await this.apiService.fetchLeagues(sport);
    this.handleSuccess(data);
} catch (error) {
    config.error('Failed to fetch leagues', error);
    this.showErrorMessage('Failed to load leagues. Please try again.');
}
```

### Logging

**Use config logging:**
```typescript
// ✅ Good - Uses environment-aware logging
config.log('Data loaded', { count: 10 });
config.error('API failed', error);

// ❌ Avoid - Direct console
console.log('Data');
```

### Comments

**When to comment:**
- Complex algorithms
- Non-obvious business logic
- API integration details
- Workarounds for browser issues

```typescript
// Calculate age accounting for leap years
let age = today.getFullYear() - birth.getFullYear();
const monthDiff = today.getMonth() - birth.getMonth();
if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
}
```

### Testing Changes Locally

**Manual Testing:**
```bash
1. npm run dev
2. Open http://localhost:8080
3. Test your changes manually
4. Check browser console for errors
```

**Automated Testing:**
```bash
# See Testing Guide for detailed instructions
```

---

## Debugging

### Browser DevTools

**Console Tab:**
- View log messages
- See errors (red text)
- Run JavaScript commands
- Type `config.getAll()` to see configuration

**Network Tab:**
- See API requests/responses
- Check request URLs
- Verify response status (200, 404, 500, etc.)
- Inspect response data

**Elements Tab:**
- Inspect HTML structure
- See applied CSS styles
- View form values
- Check data attributes

### TypeScript Debugging

**View Compilation Errors:**
```bash
npm run build
# Shows TypeScript errors with line numbers
```

**Check Type Definitions:**
```typescript
// Hover over variable in VS Code
// Ctrl+Click (Cmd+Click on Mac) to see definition
const result = validator.validateEmail('test@example.com');
```

### API Debugging

**Check API URL:**
```typescript
// In browser console:
const config = getConfig();
console.log('API URL:', config.apiBaseUrl);
```

**Test API Endpoint:**
```bash
# Terminal:
curl http://localhost:3000/api/sports
```

**Browser DevTools Network:**
- Open Network tab
- Trigger API call
- Click request to see details
- View Response tab for data

---

## Testing

### Functional Testing

**Test Form Fields:**
1. Fill each field with valid data
2. Submit form
3. Verify success message

**Test Validation:**
1. Leave required fields empty
2. Enter invalid data (bad email, young age)
3. Verify error messages appear

**Test Dynamic Dropdowns:**
1. Select a sport
2. Verify leagues load
3. Select a league
4. Verify matchups load

**Test Payout Calculator:**
1. Enter bet amount
2. Select odds
3. Verify payout calculation is correct

### Form Data Persistence

**Test Auto-Save:**
1. Fill out some form fields
2. Wait 3 seconds
3. Refresh page
4. Verify data is restored

**Test Recovery Notification:**
1. Complete above steps
2. Check for recovery notification
3. Click dismiss
4. Notification disappears

### API Integration

**Test API Calls:**
1. Check browser Network tab
2. Verify correct endpoints are called
3. Check response data is correct

**Test Error Handling:**
1. Stop API server
2. Try to select sport
3. Verify error message displays

---

## Performance

### Optimization Tips

**Reduce Bundle Size:**
- Use only necessary libraries
- Tree-shake unused code
- Minimize CSS

**Improve Load Time:**
- Cache API responses when possible
- Lazy load images
- Minimize HTTP requests

**Monitor Performance:**
```bash
# Check page load time in browser DevTools
# Target: First Contentful Paint < 1s
```

### Best Practices

```typescript
// ✅ Debounce rapid changes
private scheduleAutoSave(): void {
    if (this.autoSaveTimer) {
        clearTimeout(this.autoSaveTimer);
    }
    this.autoSaveTimer = window.setTimeout(() => {
        this.saveFormData();
    }, 2000);
}

// ✅ Cache API responses
private leaguesCache: Map<string, League[]> = new Map();

async fetchLeagues(sport: string): Promise<League[]> {
    if (this.leaguesCache.has(sport)) {
        return this.leaguesCache.get(sport)!;
    }
    const data = await this.apiService.fetchLeagues(sport);
    this.leaguesCache.set(sport, data);
    return data;
}

// ❌ Avoid repeated DOM queries
const element = document.getElementById('id');
element.textContent = 'text1';
element.textContent = 'text2';

// ✅ Cache DOM references
const element = document.getElementById('id');
element.textContent = 'text1';
element.textContent = 'text2';
```

---

## Troubleshooting Development Issues

### Changes Not Reflecting

**Problem:** Edited code but changes don't show

**Solutions:**
1. Run `npm run build` to compile
2. Hard refresh browser (`Ctrl+Shift+R`)
3. Use `npm run watch` for auto-compile
4. Clear browser cache

### TypeScript Errors

**Problem:** `npm run build` shows errors

**Solution:**
- Read error message carefully
- Check line number
- Look for typos
- Verify imports are correct

### API Not Responding

**Problem:** API calls fail, "Failed to fetch" error

**Solutions:**
1. Run `npm run server` in separate terminal
2. Check API is running on correct port
3. Verify API endpoint URL
4. Check browser console for CORS errors

---

## Next Steps

- 📖 See [Architecture Overview](ARCHITECTURE.md)
- 🧪 See [Testing Guide](TESTING.md)
- 🚀 See [Deployment Guide](DEPLOYMENT.md)

---

**Need more help?** Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) →
