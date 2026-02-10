# Betting Form API Setup Guide

This guide explains how to set up and run the dynamic betting form with the backend API.

## Features

- **Dynamic Dropdowns**: Leagues populate based on selected sport, matchups populate based on selected league
- **RESTful API**: Backend API serves betting data
- **Real-time Updates**: Form updates instantly when selections change

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation

1. Install the required dependencies:

```bash
npm install
```

This will install:

- `express` - Web server framework
- `cors` - Enable Cross-Origin Resource Sharing
- `concurrently` - Run multiple commands simultaneously

## Running the Application

### Option 1: Run Both Server and Frontend Together

```bash
npm run dev
```

This will start:
- Backend API server on `http://localhost:3000`
- Frontend HTTP server on `http://localhost:8080`

### Option 2: Run Separately

**Terminal 1 - Start the Backend API:**
```bash
npm run server
```

**Terminal 2 - Start the Frontend:**
```bash
npm run serve
```

## Accessing the Application

Once both servers are running:
- Open your browser to: `http://localhost:8080`
- The form will automatically connect to the API at `http://localhost:3000`

## API Endpoints

### Get All Sports
```
GET http://localhost:3000/api/sports
```

### Get Leagues for a Sport
```
GET http://localhost:3000/api/leagues/:sport

Example: GET http://localhost:3000/api/leagues/football
```

### Get Matchups for a League
```
GET http://localhost:3000/api/matchups/:sport/:league

Example: GET http://localhost:3000/api/matchups/football/premier-league
```

### Health Check
```
GET http://localhost:3000/api/health
```

## How It Works

1. **User selects a sport** (e.g., Football)
   - Frontend sends request to `/api/leagues/football`
   - API returns available leagues (Premier League, La Liga, Champions League)
   - League dropdown populates with the results

2. **User selects a league** (e.g., Premier League)
   - Frontend sends request to `/api/matchups/football/premier-league`
   - API returns available matchups (Man United vs Liverpool, etc.)
   - Matchup dropdown populates with the results

3. **User completes the form** and submits

## Available Sports & Leagues

### Football (Soccer)
- Premier League
- La Liga
- UEFA Champions League

### Basketball
- NBA

### Baseball
- MLB

### Ice Hockey
- NHL

### Tennis
- ATP Tour
- WTA Tour

### Boxing/MMA
- UFC
- Professional Boxing

## Customizing the Data

To add or modify sports, leagues, or matchups, edit the `bettingData` object in [server.js](server.js).

Example:
```javascript
const bettingData = {
    football: {
        name: "Football (Soccer)",
        leagues: {
            "premier-league": {
                name: "Premier League",
                matchups: [
                    { id: "mu-liv", teams: "Man United vs Liverpool", odds: ["-150", "+130"] }
                ]
            }
        }
    }
};
```

## Troubleshooting

### Issue: "Failed to fetch leagues"
- **Solution**: Make sure the backend API server is running on port 3000
- Check: `http://localhost:3000/api/health` should return `{"status":"ok"}`

### Issue: Dropdowns not populating
- **Solution**: Open browser Developer Tools (F12) and check the Console for errors
- Verify CORS is enabled in [server.js](server.js)

### Issue: Port already in use
- **Solution**: Kill the process using the port or change the port number
- For API: Edit `PORT` variable in [server.js](server.js)
- For Frontend: Use `npx http-server -p 8081` (or any other port)

## Development

### Rebuilding TypeScript

If you modify [src/form.ts](src/form.ts), rebuild the JavaScript:

```bash
npm run build
```

Or watch for changes automatically:

```bash
npm run watch
```

## File Structure

```
automation-test-form/
├── server.js                 # Backend API server
├── index.html               # Main HTML form
├── styles.css              # Styling
├── dist/
│   └── form.js            # Compiled JavaScript
├── src/
│   └── form.ts           # TypeScript source
└── package.json          # Dependencies and scripts
```

## Notes

- The API uses in-memory data (no database required)
- All data is reset when the server restarts
- This is designed for testing and automation purposes
