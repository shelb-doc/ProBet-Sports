# API Reference Guide

Complete documentation of all available API endpoints and how to use them.

## Table of Contents
- [API Overview](#api-overview)
- [Base Configuration](#base-configuration)
- [Endpoints](#endpoints)
- [Data Structures](#data-structures)
- [Error Handling](#error-handling)
- [Examples](#examples)

---

## API Overview

### What is the API?

The ProBet Sports API provides data for:
- **Sports** - Football, Basketball, Baseball, etc.
- **Leagues** - Premier League, NBA, MLB, etc.
- **Matchups** - Specific games between teams

### Key Features

- ✅ RESTful architecture
- ✅ JSON request/response format
- ✅ Real-time data updates
- ✅ CORS enabled for browser requests
- ✅ Error handling with descriptive messages
- ✅ Environment-based configuration

### Technology Stack

- **Framework**: Express.js (Node.js)
- **Port**: 3000 (configurable)
- **Base URL**: `http://localhost:3000/api`
- **Response Format**: JSON

---

## Base Configuration

### Development Environment

```
Base URL: http://localhost:3000/api
Server: npm run server
Status Check: GET http://localhost:3000/api/health
```

### Staging Environment

```
Base URL: https://staging-api.probet-sports.com
```

### Production Environment

```
Base URL: https://api.probet-sports.com
```

### Automatic Configuration

The API base URL is automatically configured based on environment:

```typescript
import { config } from './config';

const apiUrl = config.get('apiBaseUrl');
console.log(apiUrl);  // http://localhost:3000/api (in dev)
```

---

## Endpoints

### 1. Get All Sports

**Endpoint:**
```
GET /api/sports
```

**Description:** Retrieve all available sports

**Parameters:** None

**Response:**
```json
[
  {
    "id": "football",
    "name": "Football (Soccer)",
    "emoji": "⚽"
  },
  {
    "id": "basketball",
    "name": "Basketball",
    "emoji": "🏀"
  }
]
```

**Status Codes:**
- `200` - Success
- `500` - Server error

**Usage:**
```typescript
const apiService = new BettingAPIService();
// Sports are pre-populated in HTML dropdown
// This endpoint is typically called on initialization
```

---

### 2. Get Leagues by Sport

**Endpoint:**
```
GET /api/leagues/:sport
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sport` | string | Yes | Sport ID (e.g., "football") |

**Example Request:**
```
GET /api/leagues/football
```

**Response:**
```json
[
  {
    "id": "epl",
    "name": "English Premier League"
  },
  {
    "id": "la-liga",
    "name": "La Liga"
  },
  {
    "id": "serie-a",
    "name": "Serie A"
  }
]
```

**Status Codes:**
- `200` - Success
- `404` - Sport not found
- `500` - Server error

**Error Response:**
```json
{
  "error": "Sport not found",
  "sport": "invalid"
}
```

**Usage:**
```typescript
// Called when sport is selected
const sport = 'football';
const leagues = await apiService.fetchLeagues(sport);
apiService.populateLeagues(leagues);
```

**Curl Example:**
```bash
curl http://localhost:3000/api/leagues/football
```

---

### 3. Get Matchups by Sport and League

**Endpoint:**
```
GET /api/matchups/:sport/:league
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sport` | string | Yes | Sport ID (e.g., "football") |
| `league` | string | Yes | League ID (e.g., "epl") |

**Example Request:**
```
GET /api/matchups/football/epl
```

**Response:**
```json
[
  {
    "id": "match-001",
    "teams": "Manchester United vs Liverpool",
    "odds": ["-110", "+110", "-120"]
  },
  {
    "id": "match-002",
    "teams": "Arsenal vs Chelsea",
    "odds": ["-150", "+130", "-145"]
  }
]
```

**Status Codes:**
- `200` - Success
- `404` - Sport or league not found
- `500` - Server error

**Error Response:**
```json
{
  "error": "League not found for sport",
  "sport": "football",
  "league": "invalid"
}
```

**Usage:**
```typescript
// Called when league is selected
const sport = 'football';
const league = 'epl';
const matchups = await apiService.fetchMatchups(sport, league);
apiService.populateMatchups(matchups);
```

**Curl Example:**
```bash
curl http://localhost:3000/api/matchups/football/epl
```

---

### 4. Health Check (Optional)

**Endpoint:**
```
GET /api/health
```

**Description:** Check if API server is running

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-27T10:30:00Z"
}
```

**Usage:**
```typescript
// Verify API is available before making requests
fetch('http://localhost:3000/api/health')
  .then(res => res.json())
  .then(data => console.log('API is healthy:', data));
```

---

## Data Structures

### Sport Object

```typescript
interface Sport {
    id: string;          // Unique identifier
    name: string;        // Display name
    emoji?: string;      // Optional emoji for UI
}
```

**Example:**
```json
{
  "id": "football",
  "name": "Football (Soccer)",
  "emoji": "⚽"
}
```

### League Object

```typescript
interface League {
    id: string;          // Unique identifier
    name: string;        // Display name
}
```

**Example:**
```json
{
  "id": "epl",
  "name": "English Premier League"
}
```

### Matchup Object

```typescript
interface Matchup {
    id: string;          // Unique identifier
    teams: string;       // Team names (e.g., "Team A vs Team B")
    odds?: string[];     // Optional available odds
}
```

**Example:**
```json
{
  "id": "match-001",
  "teams": "Manchester United vs Liverpool",
  "odds": ["-110", "+110", "-120"]
}
```

---

## Error Handling

### Common Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Data returned successfully |
| 400 | Bad Request | Missing required parameter |
| 404 | Not Found | Sport/league not found |
| 500 | Server Error | Unexpected server error |

### Error Response Format

```json
{
  "error": "Error message",
  "details": "Additional information",
  "timestamp": "2026-01-27T10:30:00Z"
}
```

### Handling Errors in Code

```typescript
async fetchLeagues(sport: string): Promise<League[]> {
    try {
        const url = `${this.apiBaseUrl}/leagues/${sport}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            // Handle error response
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch leagues');
        }
        
        return await response.json();
    } catch (error) {
        config.error('Failed to fetch leagues', error);
        throw error;
    }
}
```

---

## Examples

### JavaScript/TypeScript

**Fetch Sports:**
```typescript
const apiUrl = 'http://localhost:3000/api';

// Get all sports
fetch(`${apiUrl}/sports`)
    .then(res => res.json())
    .then(sports => console.log(sports))
    .catch(err => console.error(err));
```

**Fetch Leagues:**
```typescript
// Get leagues for football
fetch(`${apiUrl}/leagues/football`)
    .then(res => res.json())
    .then(leagues => console.log(leagues))
    .catch(err => console.error(err));
```

**Fetch Matchups:**
```typescript
// Get matchups for football EPL
fetch(`${apiUrl}/matchups/football/epl`)
    .then(res => res.json())
    .then(matchups => console.log(matchups))
    .catch(err => console.error(err));
```

**Async/Await:**
```typescript
async function getMatchups(sport: string, league: string) {
    try {
        const response = await fetch(`${apiUrl}/matchups/${sport}/${league}`);
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}
```

### cURL

**Test in Terminal:**
```bash
# Get sports
curl http://localhost:3000/api/sports

# Get leagues for football
curl http://localhost:3000/api/leagues/football

# Get matchups
curl http://localhost:3000/api/matchups/football/epl
```

### Postman

**Setup:**
1. Open Postman
2. Create new request
3. Set method to `GET`
4. Enter URL: `http://localhost:3000/api/leagues/football`
5. Click Send
6. View response

### REST Client (VS Code)

**Install Extension:** REST Client

**Create `.rest` file:**
```http
### Get sports
GET http://localhost:3000/api/sports

### Get leagues
GET http://localhost:3000/api/leagues/football

### Get matchups
GET http://localhost:3000/api/matchups/football/epl
```

**Usage:** Click "Send Request" above each request

---

## API Implementation

### Backend Code Structure

**Routes:** `routes/betting-routes.js`
```javascript
router.get('/sports', (req, res) => {
    // Get all sports from data
    res.json(bettingData.sports);
});

router.get('/leagues/:sport', (req, res) => {
    // Get leagues for sport
    const { sport } = req.params;
    const leagues = bettingData.leagues[sport];
    res.json(leagues || []);
});
```

**Data:** `data/betting-data.js`
```javascript
const bettingData = {
    sports: [
        { id: 'football', name: 'Football (Soccer)' },
        // ...
    ],
    leagues: {
        football: [
            { id: 'epl', name: 'English Premier League' },
            // ...
        ]
    },
    matchups: {
        football: {
            epl: [
                { id: 'match-001', teams: 'Team A vs Team B' },
                // ...
            ]
        }
    }
};
```

---

## Configuration

### Changing API Base URL

**Edit `src/config.ts`:**
```typescript
case 'staging':
    return 'https://your-staging-api.com';  // ← Change this

case 'production':
    return 'https://your-production-api.com';  // ← Change this
```

### Environment Variables

**Create `.env` file:**
```
REACT_APP_API_BASE_URL=http://localhost:3000/api
REACT_APP_ENV=development
```

---

## Testing the API

### Verify API is Running

```bash
# Terminal 1: Start API server
npm run server

# Terminal 2: Test endpoint
curl http://localhost:3000/api/sports

# Should return JSON array of sports
```

### Test All Endpoints

```bash
# Get sports
curl http://localhost:3000/api/sports

# Get leagues
curl http://localhost:3000/api/leagues/football
curl http://localhost:3000/api/leagues/basketball

# Get matchups
curl http://localhost:3000/api/matchups/football/epl
curl http://localhost:3000/api/matchups/football/la-liga
```

---

## Performance Considerations

### Request Timeouts

```typescript
const TIMEOUT = 10000;  // 10 seconds

fetch(url, { signal: AbortSignal.timeout(TIMEOUT) })
```

### Caching Strategies

```typescript
// Cache leagues in memory
private leaguesCache: Map<string, League[]> = new Map();

async fetchLeagues(sport: string): Promise<League[]> {
    if (this.leaguesCache.has(sport)) {
        return this.leaguesCache.get(sport)!;
    }
    const data = await fetch(...);
    this.leaguesCache.set(sport, data);
    return data;
}
```

### Rate Limiting

Currently not implemented, but can be added:

```typescript
// Example: Limit requests to 100 per minute
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60 * 1000,  // 1 minute
    max: 100              // 100 requests
});

app.use('/api/', limiter);
```

---

## API Roadmap

**Potential Enhancements:**
- [ ] Authentication/Authorization
- [ ] Rate limiting
- [ ] Pagination for large datasets
- [ ] Filtering and searching
- [ ] Caching headers
- [ ] API versioning (v1, v2, etc.)
- [ ] WebSocket for real-time updates
- [ ] GraphQL alternative

---

## Troubleshooting

### "Failed to fetch" Error

**Causes:**
- API server not running
- Wrong port number
- CORS not enabled
- Network issue

**Solutions:**
1. Check API is running: `npm run server`
2. Verify URL: `http://localhost:3000/api`
3. Check CORS in `server.js`
4. Check browser console for errors

### Empty or Unexpected Response

**Causes:**
- Wrong endpoint
- Wrong parameter
- No data for selection

**Solutions:**
1. Test with cURL: `curl http://localhost:3000/api/leagues/football`
2. Check parameter spelling
3. Verify data exists in `data/betting-data.js`

### CORS Error

**Error Message:**
```
Access to XMLHttpRequest at 'http://localhost:3000/api/sports' 
from origin 'http://localhost:8080' has been blocked by CORS policy
```

**Solution:**
Check `server.js` has:
```javascript
app.use(cors());
```

---

## Next Steps

- 🔧 See [Development Guide](DEVELOPMENT.md)
- 🧪 See [Testing Guide](TESTING.md)
- 📊 See [Architecture Overview](ARCHITECTURE.md)

---

**Questions?** Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) →
