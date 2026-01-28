# ProBet Sports - Sports Betting Form for Automation Testing

A comprehensive sports betting web form built with TypeScript, specifically designed for automation testing practice. Features account creation, bet placement, real-time payout calculation, and complete form validation.

## Features

- **Sports Betting Theme**: Professional sportsbook design with green and gold color scheme
- **Test-friendly attributes**: All form elements include `data-testid` attributes for easy automation
- **Multiple input types**: Text, email, password, number, select dropdowns, radio buttons, and checkboxes
- **Real-time payout calculator**: Automatically calculates potential winnings based on bet amount and odds
- **Comprehensive validation**: Age verification, bet limits, and required field validation
- **Responsive design**: Works on desktop, tablet, and mobile devices
- **Success confirmation**: Displays bet summary with all details after successful submission

## Project Structure

```
automation-test-form/
├── index.html          # Sports betting form HTML
├── styles.css          # Sports betting themed styles
├── src/
│   └── form.ts         # TypeScript bet form handler
├── dist/               # Compiled JavaScript (generated)
├── package.json        # Node dependencies
├── tsconfig.json       # TypeScript configuration
└── README.md           # This file
```

## Setup Instructions

1. Navigate to the project directory:
```bash
cd automation-test-form
```

2. Install dependencies:
```bash
npm install
```

3. Compile TypeScript:
```bash
npm run build
```

4. Serve the application:
```bash
npm run serve
```

5. Open your browser to `http://localhost:8080`

## Form Sections

### 1. Account Information
- First Name & Last Name
- Email Address
- Password
- Country Selection
- Age Verification (18+ required)

### 2. Place Your Bet
- Sport Selection (Football, Basketball, Baseball, etc.)
- League/Competition Selection
- Matchup Selection
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

### Account Information
- `data-testid="first-name-input"` - First name text input
- `data-testid="last-name-input"` - Last name text input
- `data-testid="email-input"` - Email input
- `data-testid="password-input"` - Password input
- `data-testid="country-select"` - Country dropdown
- `data-testid="age-input"` - Age number input

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
- `data-testid="potential-payout"` - Payout display container
- `data-testid="payout-amount"` - Calculated payout amount

### Favorite Sports
- `data-testid="fav-football"` - Football checkbox
- `data-testid="fav-basketball"` - Basketball checkbox
- `data-testid="fav-baseball"` - Baseball checkbox
- `data-testid="fav-hockey"` - Hockey checkbox
- `data-testid="fav-tennis"` - Tennis checkbox
- `data-testid="fav-boxing"` - Boxing/MMA checkbox

### Terms & Actions
- `data-testid="age-verification-checkbox"` - Age verification checkbox
- `data-testid="terms-checkbox"` - Terms acceptance checkbox
- `data-testid="newsletter-checkbox"` - Newsletter opt-in checkbox
- `data-testid="submit-button"` - Place Bet button
- `data-testid="reset-button"` - Clear Form button

### Error Messages
- `data-testid="first-name-error"` - First name error
- `data-testid="last-name-error"` - Last name error
- `data-testid="email-error"` - Email error
- `data-testid="password-error"` - Password error
- `data-testid="country-error"` - Country error
- `data-testid="age-error"` - Age error
- `data-testid="sport-error"` - Sport selection error
- `data-testid="league-error"` - League selection error
- `data-testid="matchup-error"` - Matchup selection error
- `data-testid="bettype-error"` - Bet type error
- `data-testid="bet-amount-error"` - Bet amount error
- `data-testid="odds-error"` - Odds selection error
- `data-testid="age-verification-error"` - Age verification error
- `data-testid="terms-error"` - Terms acceptance error

### Success State
- `data-testid="success-message"` - Success message container
- `data-testid="submitted-data"` - Bet summary container

## Form Validation Rules

### Required Fields
- First Name
- Last Name
- Email (valid format)
- Password (minimum 8 characters)
- Country
- Age (18-120)
- Sport
- League
- Matchup
- Bet Type
- Bet Amount ($1 - $10,000)
- Odds
- Age Verification (must be checked)
- Terms & Conditions (must be checked)

### Validation Details
- **Email**: Must match standard email format
- **Password**: Minimum 8 characters
- **Age**: Must be 18 or older, maximum 120
- **Bet Amount**: Minimum $1.00, Maximum $10,000.00
- **Payout Calculation**:
  - Positive odds: `bet + (bet × odds/100)`
  - Negative odds: `bet + (bet × 100/|odds|)`

## Automation Test Scenarios

### Basic Scenarios
1. **Complete Bet Placement**: Fill all required fields and place a bet
2. **Empty Form Submission**: Submit without filling fields and verify errors
3. **Age Restriction**: Try to submit with age under 18
4. **Invalid Email**: Test with invalid email formats
5. **Password Too Short**: Enter password with less than 8 characters
6. **Bet Amount Limits**: Test minimum ($1) and maximum ($10,000) bet amounts

### Advanced Scenarios
7. **Payout Calculation**: Verify payout updates when bet amount or odds change
8. **Form Reset**: Fill form and click reset button
9. **Multiple Sports Selection**: Select multiple favorite sports
10. **Required vs Optional**: Verify only required fields block submission
11. **Success State**: Verify bet summary displays correctly after submission
12. **Terms Checkboxes**: Test age verification and terms acceptance requirements
13. **Bet Type Selection**: Test each bet type radio button
14. **Dropdown Interactions**: Test sport, league, matchup, and odds dropdowns
15. **Real-time Validation**: Verify error messages appear/disappear on blur

## Development Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch mode for development
- `npm run serve` - Start local HTTP server on port 8080

## Technologies Used

- TypeScript
- HTML5
- CSS3
- Native DOM APIs (no frameworks)

## Design Features

- Green and gold sports betting color scheme
- Gradient backgrounds and hover effects
- Real-time payout calculator display
- Organized sections with visual hierarchy
- Mobile-responsive layout
- Professional sportsbook aesthetic

## Notes for Automation Testing

- All interactive elements have unique `data-testid` attributes
- Form validation provides specific error messages
- Success state is clearly defined and testable
- Payout calculator can be tested independently
- Age restrictions are enforced at form level
- Comprehensive dropdown options for various test scenarios
- Real-time feedback on field validation
