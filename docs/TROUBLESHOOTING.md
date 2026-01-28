# Troubleshooting Guide

Solutions for common issues and problems with ProBet Sports.

## Table of Contents
- [Installation Issues](#installation-issues)
- [Development Issues](#development-issues)
- [API Issues](#api-issues)
- [Form Issues](#form-issues)
- [Browser Issues](#browser-issues)
- [Performance Issues](#performance-issues)
- [Getting More Help](#getting-more-help)

---

## Installation Issues

### npm install Fails

**Error Message:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**

**Option 1:** Clear cache and retry
```bash
npm cache clean --force
npm install
```

**Option 2:** Use legacy peer deps resolver
```bash
npm install --legacy-peer-deps
```

**Option 3:** Start fresh
```bash
rm -rf node_modules package-lock.json
npm install
```

**Option 4:** Use npm ci for exact versions
```bash
npm ci
```

---

### Node.js Not Found

**Error Message:**
```
'node' is not recognized as an internal or external command
```

**Causes:**
- Node.js not installed
- Not in system PATH
- Terminal not restarted after install

**Solutions:**

1. **Check if installed:**
   ```bash
   node --version
   npm --version
   ```

2. **Install Node.js:**
   - Download from https://nodejs.org
   - Use LTS (Long-Term Support) version
   - Run installer and follow steps
   - **Restart terminal after install**

3. **Add to PATH (Windows):**
   - Search "Environment Variables"
   - Edit system environment variables
   - Add Node.js installation directory to PATH
   - Restart terminal

---

### Missing Dependencies

**Error Message:**
```
Cannot find module 'express'
Cannot find module 'cors'
```

**Solutions:**
```bash
# Reinstall dependencies
npm install

# Check specific package
npm list express

# Reinstall specific package
npm install express
```

---

## Development Issues

### TypeScript Compilation Fails

**Error Messages:**
```
error TS2307: Cannot find module
error TS2322: Type mismatch
error TS1005: Unexpected token
```

**Solutions:**

1. **Check syntax errors:**
   - Read error message carefully
   - Check file and line number
   - Fix the specific syntax error

2. **Rebuild from scratch:**
   ```bash
   rm -rf dist
   npm run build
   ```

3. **Check TypeScript version:**
   ```bash
   npm list typescript
   # Should be v5.3.3+
   ```

4. **View detailed errors:**
   ```bash
   npm run build 2>&1 | more
   ```

---

### Changes Not Reflecting

**Problem:** Edit code but changes don't show in browser

**Solutions:**

1. **Compile TypeScript:**
   ```bash
   npm run build
   ```

2. **Use watch mode for auto-compile:**
   ```bash
   npm run watch
   ```

3. **Hard refresh browser:**
   - Windows: `Ctrl+Shift+R`
   - Mac: `Cmd+Shift+R`

4. **Clear browser cache:**
   - Open DevTools (`F12`)
   - Network tab
   - Check "Disable cache" while DevTools open

5. **Check file was saved:**
   - In VS Code, filename shouldn't have dot
   - If has dot, save file (`Ctrl+S`)

---

### Port Already in Use

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::3000
Error: listen EADDRINUSE: address already in use :::8080
```

**Solutions:**

**Option 1:** Kill process using port

**Windows:**
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace PID with actual number)
taskkill /PID 1234 /F
```

**macOS/Linux:**
```bash
# Find process
lsof -i :3000

# Kill process (replace PID)
kill -9 1234
```

**Option 2:** Use different port

Edit `server.js`:
```javascript
const PORT = process.env.PORT || 3001; // Change from 3000
```

Edit the fetch URL in `src/api-service.ts`:
```typescript
private apiBaseUrl: string = 'http://localhost:3001/api'; // Match new port
```

---

### "Cannot find dist/form.js"

**Error Message:**
```
Failed to load resource: the server responded with a status of 404 (Not Found)
GET http://localhost:8080/dist/form.js 404
```

**Solutions:**

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Verify build succeeded:**
   ```bash
   ls dist/
   # Should list: form.js, validators.js, api-service.js, etc.
   ```

3. **Check index.html references correct file:**
   ```html
   <!-- In index.html, should have: -->
   <script src="dist/form.js"></script>
   ```

---

## API Issues

### "Failed to fetch" Error

**Error Message:**
```
TypeError: Failed to fetch
CORS policy: Cross-Origin Request Blocked
Connection refused
```

**Causes:**
- API server not running
- Wrong URL/port
- CORS not enabled
- Network issue

**Solutions:**

1. **Start API server:**
   ```bash
   npm run server
   # Should show: "🎲 Betting API Server running on http://localhost:3000"
   ```

2. **Verify correct port:**
   - Frontend: http://localhost:8080
   - API: http://localhost:3000
   - API endpoints: http://localhost:3000/api/*

3. **Check CORS enabled in server.js:**
   ```javascript
   const cors = require('cors');
   app.use(cors());  // This line must exist
   ```

4. **Test API endpoint:**
   ```bash
   curl http://localhost:3000/api/sports
   # Should return JSON data
   ```

---

### API Returns Empty Data

**Problem:** Dropdowns are empty, no data loads

**Causes:**
- Data file is empty
- Wrong endpoint URL
- Server not running

**Solutions:**

1. **Check data file:**
   ```bash
   cat data/betting-data.js | head -20
   # Should show sports, leagues, matchups data
   ```

2. **Verify endpoint:**
   ```bash
   curl http://localhost:3000/api/leagues/football
   # Should return array of leagues
   ```

3. **Check browser console:**
   - Press `F12`
   - Click "Console" tab
   - Look for errors or logged data

---

### API Response Errors

**Error Messages:**
```
{
  "error": "Sport not found",
  "sport": "invalid"
}
```

**Solutions:**

1. **Check sport ID spelling:**
   - Valid: `football`, `basketball`, `baseball`, `hockey`, `tennis`, `boxing`
   - Check case sensitivity (lowercase)

2. **Verify league ID:**
   ```bash
   curl http://localhost:3000/api/leagues/football
   # Get valid league IDs from response
   ```

3. **Check data exists:**
   - Edit `data/betting-data.js`
   - Add missing sports/leagues/matchups
   - Restart server

---

### API Timeout

**Error Message:**
```
The connection timed out
Request timed out after 10000ms
```

**Causes:**
- Server is slow
- Network latency
- Server not responding

**Solutions:**

1. **Check server health:**
   ```bash
   npm run server
   # Watch for startup errors
   ```

2. **Increase timeout in config:**
   Edit `src/config.ts`:
   ```typescript
   apiTimeout: 30000  // Increase from 10000
   ```

3. **Check network:**
   - Run `ping google.com`
   - Check firewall settings
   - Try different network

---

## Form Issues

### Form Won't Validate

**Problem:** Can submit with empty fields, errors don't show

**Causes:**
- JavaScript not loaded
- dist/form.js not compiled
- Browser JavaScript disabled

**Solutions:**

1. **Check JavaScript is loaded:**
   - Press `F12` to open DevTools
   - Click "Console" tab
   - Type: `typeof BettingFormHandler`
   - Should show: "function"

2. **Rebuild TypeScript:**
   ```bash
   npm run build
   ```

3. **Enable JavaScript in browser:**
   - Chrome: Settings → Privacy & Security → Site Settings → JavaScript
   - Check JavaScript is enabled

---

### Dropdowns Not Populating

**Problem:** Selecting sport doesn't load leagues, or selecting league doesn't load matchups

**Causes:**
- API not running
- API endpoint error
- Network timeout

**Solutions:**

1. **Start API server:**
   ```bash
   npm run server
   ```

2. **Check API endpoint works:**
   ```bash
   curl http://localhost:3000/api/leagues/football
   # Should return league data
   ```

3. **Check browser console for errors:**
   - Press `F12`
   - Click "Console"
   - Look for red error messages
   - Click error to see details

4. **Check Network tab:**
   - Open DevTools → Network
   - Click on sport dropdown
   - Look for "leagues" request
   - Check if returns status 200
   - Click request to see response data

---

### Payout Not Calculating

**Problem:** Enter amount and odds, but payout doesn't update

**Causes:**
- JavaScript error
- PayoutCalculator not loaded
- Invalid odds format

**Solutions:**

1. **Check JavaScript:**
   - Open DevTools Console
   - Check for errors
   - Rebuild: `npm run build`

2. **Test calculation manually:**
   - Console: `PayoutCalculator.calculatePayout(100, '-110')`
   - Should return a number

3. **Verify odds format:**
   - Valid: `-200`, `+110`, `-150`
   - Check quotes: `'value'` not `value`

---

### Form Data Not Saving

**Problem:** Fill form, refresh, data is gone

**Causes:**
- Browser doesn't support localStorage
- Private/Incognito mode
- Storage quota exceeded
- Auto-save disabled

**Solutions:**

1. **Check localStorage is enabled:**
   - DevTools → Application/Storage → Local Storage
   - Should list site URL

2. **Try normal mode (not Incognito):**
   - Incognito/Private mode doesn't persist storage

3. **Clear storage and retry:**
   - DevTools → Application → Clear Storage
   - Fill form and wait 3 seconds
   - Refresh page

4. **Check browser console:**
   - Look for storage quota errors
   - Check for other JavaScript errors

---

### Validation Errors Show Incorrectly

**Problem:** Error messages don't disappear, wrong errors show, etc.

**Causes:**
- Multiple error handlers running
- Timing issue
- Wrong error ID

**Solutions:**

1. **Hard refresh page:**
   - `Ctrl+Shift+R` (Windows)
   - `Cmd+Shift+R` (Mac)

2. **Clear browser storage:**
   - DevTools → Application → Clear Storage

3. **Rebuild TypeScript:**
   ```bash
   npm run build
   ```

---

## Browser Issues

### Styles Not Loading

**Problem:** Form looks plain, colors are wrong, layout is broken

**Causes:**
- CSS file not served
- Browser cache
- CSS parsing error

**Solutions:**

1. **Hard refresh:**
   - `Ctrl+Shift+R` (Windows/Linux)
   - `Cmd+Shift+R` (Mac)

2. **Check CSS file served:**
   - DevTools → Network
   - Look for `styles.css` request
   - Should show status 200
   - If 404, check file exists in root directory

3. **Check CSS errors:**
   - DevTools → Console
   - Look for CSS parsing errors
   - Click errors for details

4. **Verify file exists:**
   ```bash
   ls styles.css
   # File should exist in project root
   ```

---

### Disclaimer Modal Won't Close

**Problem:** Can't dismiss disclaimer, stuck on modal

**Causes:**
- JavaScript error
- Button not working
- Event listener not attached

**Solutions:**

1. **Try clicking button again:**
   - Sometimes takes moment to register

2. **Open DevTools Console:**
   - Press `F12`
   - Check for JavaScript errors
   - Rebuild: `npm run build`

3. **Try refreshing page:**
   - `F5` or `Ctrl+R`

4. **Check button exists:**
   - DevTools → Elements
   - Search for "acceptDisclaimer"
   - Button should be visible

---

### Text Fields Not Accepting Input

**Problem:** Can't type in text inputs

**Causes:**
- Form disabled
- JavaScript error
- Input attribute issue

**Solutions:**

1. **Check input is enabled:**
   - Right-click input → Inspect
   - Look for `disabled` attribute
   - Should not be present

2. **Check for JavaScript errors:**
   - DevTools → Console
   - Look for red errors

3. **Try different browser:**
   - Chrome, Firefox, Safari, Edge
   - See if issue persists

---

### Buttons Don't Work

**Problem:** Click buttons but nothing happens

**Causes:**
- JavaScript error
- Event listener not attached
- Button disabled

**Solutions:**

1. **Check console for errors:**
   - Press `F12`
   - Click "Console"
   - Look for red error messages

2. **Check button is enabled:**
   - Right-click button → Inspect
   - Look for `disabled` attribute

3. **Rebuild TypeScript:**
   ```bash
   npm run build
   ```

---

## Performance Issues

### Page Loads Slowly

**Solutions:**

1. **Check network:**
   - Run `ping google.com`
   - Check internet speed

2. **Monitor API performance:**
   - DevTools → Network
   - Select sport
   - Check request duration
   - Should be < 1 second

3. **Reduce data:**
   - Clear browser cache
   - Close unnecessary tabs
   - Restart browser

---

### Form Submission Takes Long

**Solutions:**

1. **Check API is running:**
   ```bash
   npm run server
   ```

2. **Check Network tab:**
   - DevTools → Network
   - Click submit
   - Check request time
   - If > 5 seconds, API may be slow

3. **Increase timeout:**
   - Edit `src/config.ts`
   - Change `apiTimeout` to 30000

---

### Frequent API Failures

**Solutions:**

1. **Restart API server:**
   ```bash
   # Kill current server (Ctrl+C)
   npm run server
   ```

2. **Check server logs:**
   - Watch console output
   - Look for errors
   - Check data file is valid

3. **Simplify data:**
   - Reduce number of sports/leagues
   - Check for syntax errors in data file

---

## Getting More Help

### Check Documentation

- 📖 [Setup Guide](SETUP.md)
- 🔧 [Development Guide](DEVELOPMENT.md)
- 📊 [API Reference](API_REFERENCE.md)
- 🧪 [Testing Guide](TESTING.md)
- ✨ [Features Overview](FEATURES.md)

### Debug Steps

1. **Identify the problem:**
   - What specifically isn't working?
   - What did you just do?
   - Any error messages?

2. **Check error messages:**
   - Browser console errors
   - Network tab responses
   - Server/terminal output

3. **Try basic solutions:**
   - Refresh browser
   - Hard refresh (Ctrl+Shift+R)
   - Restart API server
   - Rebuild TypeScript

4. **Search documentation:**
   - Use Ctrl+F to search
   - Check similar issues

### Report an Issue

**Provide:**
- What you were trying to do
- Exact error message
- Steps to reproduce
- Browser and OS
- Console errors (if any)

**Example:**
```
I was trying to submit the form with bet amount of $100.
Got error: "TypeError: Cannot read property 'calculatePayout' of undefined"
Steps: Fill form → Click place bet → Error appears
Browser: Chrome 120 on Windows 11
Console: See attached screenshot
```

---

### Still Stuck?

**Try these resources:**
1. Re-read the relevant documentation
2. Check browser console for clues
3. Check Network tab in DevTools
4. Restart terminal/server
5. Restart browser
6. Clear browser cache
7. Try different browser
8. Ask colleague or post in forum

---

**Can't find your issue?** Create a GitHub issue with details →
