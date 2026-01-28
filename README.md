# ProBet Sports - Sports Betting Form for Automation Testing

A comprehensive sports betting web form built with TypeScript, specifically designed for automation testing practice. Features account creation, bet placement, real-time payout calculation, dynamic API-driven dropdowns, and complete form validation.

**✨ Recently Refactored**: This project has been completely refactored with modular architecture, CSS variables, and professional code organization. See [REFACTORING.md](docs/REFACTORING.md) for details.

## ⚠️ Disclaimer

**This is NOT a real betting platform.** This is a test environment for automation testing and software quality assurance purposes only. No real money or bets are involved.

## Features

- **Sports Betting Theme**: Professional sportsbook design with green and gold color scheme
- **Test-friendly attributes**: All form elements include `data-testid` attributes for easy automation
- **Multiple input types**: Text, email, password, date picker, select dropdowns, radio buttons, and checkboxes
- **Dynamic API-driven dropdowns**: Sport → League → Matchup cascading selection
- **Real-time payout calculator**: Automatically calculates potential winnings based on bet amount and odds
- **Comprehensive validation**: Age verification, bet limits, and required field validation
- **Responsive design**: Works on desktop, tablet, and mobile devices
- **Modular architecture**: Clean separation of concerns with TypeScript classes
- **Success confirmation**: Displays bet summary with all details after successful submission

## Project Structure

```
automation-test-form/
├── index.html               # Sports betting form HTML
├── styles.css               # Sports betting themed styles (with CSS variables)
├── server.js                # Express API server (refactored)
├── src/                     # TypeScript source files
│   ├── form.ts              # Main form handler (refactored)
│   ├── validators.ts        # FormValidator class
│   ├── api-service.ts       # BettingAPIService class
│   └── payout-calculator.ts # PayoutCalculator utility
├── dist/                    # Compiled JavaScript (generated, not in git)
├── data/                    # Server data
│   └── betting-data.js      # Sports, leagues, matchups data
├── routes/                  # API routes
│   └── betting-routes.js    # Express routes with validation
├── middleware/              # Server middleware
│   └── error-handler.js     # Error handling middleware
├── package.json             # Node dependencies
├── tsconfig.json            # TypeScript configuration
├── .gitignore               # Git ignore rules
├── docs/                    # Documentation
│   ├── REFACTORING.md       # Comprehensive refactoring guide
│   ├── BUILD.md             # Build instructions
│   ├── CHANGES_SUMMARY.md   # Summary of refactoring changes
│   ├── ARCHITECTURE.md      # Architecture diagrams
│   ├── GITHUB_SETUP.md      # GitHub setup instructions
│   └── PRE_GITHUB_CHECKLIST.md # Pre-upload checklist
├── backups/                 # Backup files (not in git)
├── LICENSE                  # ISC License
└── README.md                # This file
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**:
```bash
git clone https://github.com/YOUR_USERNAME/automation-test-form.git
cd automation-test-form
```

2. **Install dependencies**:
```bash
npm install
```

3. **Build the TypeScript**:
```bash
npm run build
```

4. **Start the API server**:
```bash
npm run server
```
The API server will run on `http://localhost:3000`

5. **Open the application**:
   - Simply open `index.html` in your browser, or
   - Serve it with a local server:
   ```bash
   npm run serve
   ```
   Then navigate to `http://localhost:8080`

## Development

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch mode for development (auto-compile on save)
- `npm run server` - Start the Express API server
- `npm run serve` - Start local HTTP server for frontend
- `npm run dev` - Run both API server and frontend server concurrently

### Project Architecture

The application uses a **modular architecture** with clear separation of concerns:

**Frontend (TypeScript)**:
- `FormValidator` - Handles all input validation
- `BettingAPIService` - Manages API communication
- `PayoutCalculator` - Calculates bet payouts
- `BettingFormHandler` - Orchestrates form behavior

**Backend (Node.js/Express)**:
- Express server with modular routes
- Validation middleware
- Centralized error handling
- RESTful API endpoints

**Styling**:
- CSS with custom properties (variables) for easy theming
- Responsive design with mobile-first approach
- Animated gradient backgrounds
- Hover effects on interactive elements

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed diagrams.

## API Endpoints

The application includes a RESTful API for dynamic dropdown data:

- `GET /api/sports` - Get all available sports
- `GET /api/leagues/:sport` - Get leagues for a specific sport
- `GET /api/matchups/:sport/:league` - Get matchups for a specific league
- `GET /api/health` - Health check endpoint

## Form Sections

### 1. Account Information
- First Name & Last Name
- Email Address
- Password (minimum 8 characters)
- Country Selection
- Date of Birth (with age validation 18+)

### 2. Place Your Bet
- Sport Selection (Football, Basketball, Baseball, etc.)
- League/Competition Selection (dynamic based on sport)
- Matchup Selection (dynamic based on league)
- Bet Type (Moneyline, Point Spread, Over/Under, Parlay)
- Bet Amount (Min $1, Max $10,000)
- Odds Selection
- Real-time Payout Calculator

### 3. Betting Preferences
- Favorite Sports (optional multi-select)
- Newsletter subscription

### 4. Terms & Conditions
- Age verification checkbox (18+)
- Terms and conditions acceptance
- Promotional offers opt-in

## Test Attributes Reference

All interactive elements include `data-testid` attributes for easy automation testing.

### Account Information
- `data-testid="first-name-input"` - First name text input
- `data-testid="last-name-input"` - Last name text input
- `data-testid="email-input"` - Email input
- `data-testid="password-input"` - Password input
- `data-testid="country-select"` - Country dropdown
- `data-testid="age-input"` - Date of birth input

### Bet Placement
- `data-testid="sport-select"` - Sport selection dropdown
- `data-testid="league-select"` - League selection dropdown
- `data-testid="matchup-select"` - Matchup selection dropdown
- `data-testid="bet-moneyline"` - Moneyline bet type radio
- `data-testid="bet-spread"` - Point spread bet type radio
- `data-testid="bet-overunder"` - Over/Under bet type radio
- `data-testid="bet-parlay"` - Parlay bet type radio
- `data-testid="bet-amount-input"` - Bet amount input
- `data-testid="odds-select"` - Odds selection dropdown
- `data-testid="payout-amount"` - Calculated payout amount

### Favorite Sports
- `data-testid="fav-football"` to `data-testid="fav-boxing"` - Sport checkboxes

### Terms & Actions
- `data-testid="age-verification-checkbox"` - Age verification
- `data-testid="terms-checkbox"` - Terms acceptance
- `data-testid="newsletter-checkbox"` - Newsletter opt-in
- `data-testid="submit-button"` - Place Bet button
- `data-testid="reset-button"` - Clear Form button

### Error Messages
All error messages follow the pattern: `data-testid="[field-name]-error"`

### Success State
- `data-testid="success-message"` - Success message container
- `data-testid="submitted-data"` - Bet summary container

## Form Validation Rules

### Required Fields
- First Name, Last Name
- Valid email format
- Password (minimum 8 characters)
- Country
- Date of Birth (must be 18+, max 120)
- Sport, League, Matchup
- Bet Type
- Bet Amount ($1 - $10,000)
- Odds
- Age Verification (must be checked)
- Terms & Conditions (must be checked)

### Payout Calculation
- **Positive odds** (underdog): `payout = bet + (bet × odds/100)`
- **Negative odds** (favorite): `payout = bet + (bet × 100/|odds|)`

## Automation Test Scenarios

### Basic Scenarios
1. **Complete Bet Placement** - Fill all required fields and submit
2. **Empty Form Submission** - Verify all error messages appear
3. **Age Restriction** - Submit with age under 18
4. **Invalid Email** - Test various invalid email formats
5. **Password Validation** - Test minimum 8 characters rule
6. **Bet Amount Limits** - Test min ($1) and max ($10,000)

### Advanced Scenarios
7. **Dynamic Dropdowns** - Verify league loads when sport selected
8. **Payout Calculation** - Verify real-time payout updates
9. **Form Reset** - Test reset button clears all fields
10. **Multiple Selections** - Select multiple favorite sports
11. **Success State** - Verify bet summary displays correctly
12. **Real-time Validation** - Test blur event validation
13. **API Integration** - Verify dropdown data loads from server

## Technologies Used

- **Frontend**: TypeScript, HTML5, CSS3
- **Backend**: Node.js, Express.js
- **Build Tools**: TypeScript Compiler
- **Architecture**: Modular ES2020 modules
- **No Frameworks**: Pure DOM manipulation (easy to understand)

## Refactoring Details

This project has been professionally refactored with:

- ✅ **CSS Variables** - Easy theming and customization
- ✅ **Modular TypeScript** - Separated concerns (validators, API, utilities)
- ✅ **Server Architecture** - Clean Express app with middleware
- ✅ **Documentation** - Comprehensive guides and diagrams
- ✅ **Best Practices** - Industry-standard patterns

See [docs/REFACTORING.md](docs/REFACTORING.md) for complete details.

## Contributing

This is a test automation practice project. Feel free to:
- Add more test scenarios
- Improve validation
- Enhance the UI
- Add more sports/leagues
- Create automation test suites

## License

ISC - Free for educational and testing purposes

## Acknowledgments

Created for automation testing education and practice. Not affiliated with any real betting platform.

---

**Note**: This is a demonstration project for testing purposes only. No real gambling functionality is included.
