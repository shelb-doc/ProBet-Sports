# Build Instructions

## Quick Start

To build and run the refactored project, run these commands in your terminal:

### 1. Compile TypeScript
```bash
npm run build
```

This will compile all TypeScript files from `src/` to `dist/`.

### 2. Start the Server
```bash
npm run server
```

The API server will start on `http://localhost:3000`.

### 3. Open the Application

Open `index.html` in your browser or serve it with a local server:

```bash
npm run serve
```

Then navigate to `http://localhost:8080`.

---

## Development Workflow

### Watch Mode (Auto-compile)
```bash
npm run watch
```

This will automatically recompile TypeScript files when you save changes.

### Run Server and Frontend Together
```bash
npm run dev
```

This runs both the API server and frontend server concurrently.

---

## Manual Build (if npm commands don't work)

If you're in an environment where `npm` commands aren't available, you can manually compile:

### Using TypeScript Compiler Directly
```bash
tsc
```

Or if TypeScript is installed globally:
```bash
npx tsc
```

---

## File Structure After Build

```
automation-test-form/
├── src/                      # TypeScript source files
│   ├── form.ts              # Main form handler (refactored)
│   ├── validators.ts        # Validation logic
│   ├── api-service.ts       # API communication
│   └── payout-calculator.ts # Utility functions
├── dist/                     # Compiled JavaScript (generated)
│   ├── form.js
│   ├── validators.js
│   ├── api-service.js
│   └── payout-calculator.js
├── data/                     # Server data
│   └── betting-data.js
├── routes/                   # API routes
│   └── betting-routes.js
├── middleware/               # Server middleware
│   └── error-handler.js
├── styles.css               # Refactored with CSS variables
├── index.html               # Main HTML file
├── server.js                # Refactored server
└── package.json             # Project configuration
```

---

## Troubleshooting

### TypeScript Not Found
If you get "tsc: command not found":
```bash
npm install -g typescript
```

### Dependencies Missing
```bash
npm install
```

### Port Already in Use
If port 3000 is already in use, set a custom port:
```bash
PORT=3001 npm run server
```

---

## Verifying the Build

After building, check that these files exist:
- `dist/form.js`
- `dist/validators.js`
- `dist/api-service.js`
- `dist/payout-calculator.js`

The `dist/form.js` file should be referenced by `index.html`:
```html
<script src="dist/form.js"></script>
```

---

## Production Build

For production, consider:

1. **Minification**: Add a minifier to reduce file size
2. **Bundling**: Use Webpack or Rollup to bundle modules
3. **Source Maps**: Already enabled in tsconfig.json

### Example Production Build
```bash
# Install build tools
npm install --save-dev webpack webpack-cli terser-webpack-plugin

# Create webpack config
# Run production build
npm run build:prod
```

---

## Next Steps

After successful build:
1. Test the form functionality
2. Verify API endpoints work
3. Check browser console for errors
4. Review the REFACTORING.md document for details on all changes
