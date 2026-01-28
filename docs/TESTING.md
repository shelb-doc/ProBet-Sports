# Testing Guide

Complete guide for testing ProBet Sports - from manual testing to automation strategies.

## Table of Contents
- [Testing Overview](#testing-overview)
- [Manual Testing](#manual-testing)
- [Automated Testing](#automated-testing)
- [Test Data](#test-data)
- [Validation Testing](#validation-testing)
- [API Testing](#api-testing)
- [Best Practices](#best-practices)

---

## Testing Overview

### Why Test?

- ✅ Catch bugs before users find them
- ✅ Verify features work correctly
- ✅ Ensure data is valid
- ✅ Test error handling
- ✅ Performance validation

### Test Categories

1. **Manual Testing** - Click and observe
2. **Functional Testing** - Feature works as expected
3. **Validation Testing** - Data validation works
4. **API Testing** - Backend endpoints work
5. **Integration Testing** - Frontend + Backend work together
6. **Automated Testing** - Scripts verify behavior

### Test Environments

```
Development:  http://localhost:8080 (frontend)
              http://localhost:3000 (API)
              
Staging:      https://staging.probet-sports.com
              https://staging-api.probet-sports.com
              
Production:   https://probet-sports.com
              https://api.probet-sports.com
```

---

## Manual Testing

### Quick Smoke Test

**Time:** 5 minutes

**Steps:**
1. Open http://localhost:8080
2. Dismiss disclaimer
3. Enter test data in all fields
4. Select sport, league, matchup
5. Enter bet amount and odds
6. Click "Place Bet"
7. Verify success message

**Expected Results:**
- All fields accept input
- Dropdowns populate
- Payout calculates
- Success message shows

---

### Complete Feature Test

**Time:** 30 minutes

#### 1. Form Loading
- [ ] Page loads without errors
- [ ] All fields are visible
- [ ] Form is responsive (resize window)
- [ ] Disclaimer appears first
- [ ] Can dismiss disclaimer

#### 2. Account Information Section
- [ ] First name field accepts text
- [ ] Last name field accepts text
- [ ] Email field accepts email format
- [ ] Email rejects invalid format
- [ ] Password field masks input
- [ ] Country dropdown populates
- [ ] Date picker shows calendar
- [ ] Can select date of birth

#### 3. Bet Placement Section
- [ ] Sport dropdown has options
- [ ] Selecting sport populates leagues
- [ ] League loader appears during load
- [ ] Selecting league populates matchups
- [ ] Matchup loader appears during load
- [ ] Can select bet type (radio buttons)
- [ ] Bet amount accepts decimals (e.g., 10.50)
- [ ] Odds dropdown has options
- [ ] Payout updates when amount changes
- [ ] Payout updates when odds change

#### 4. Preferences Section
- [ ] Can select favorite sports
- [ ] Can select/deselect multiple sports
- [ ] Age verification checkbox works
- [ ] Terms checkbox works
- [ ] Responsible gaming checkbox works
- [ ] Newsletter checkbox works

#### 5. Form Validation
- [ ] Required fields show errors when empty
- [ ] Email validation works (invalid format)
- [ ] Age validation works (under 18)
- [ ] Bet amount validation works (0 or negative)
- [ ] All error messages are clear
- [ ] Errors clear when fixed

#### 6. API Integration
- [ ] Leagues load from API
- [ ] Matchups load from API
- [ ] Error handling works (simulate offline)
- [ ] Loading spinners appear/disappear
- [ ] API errors display to user

#### 7. Form Persistence
- [ ] Fill some fields
- [ ] Wait 3 seconds (auto-save)
- [ ] Refresh page
- [ ] Data is restored
- [ ] Recovery notification appears
- [ ] Can dismiss notification

#### 8. Success Confirmation
- [ ] Fill form with valid data
- [ ] Click "Place Bet"
- [ ] Success message appears
- [ ] All form data displays in summary
- [ ] Can click "Place Another Bet"
- [ ] Form resets for new bet

---

## Automated Testing

### Browser Automation Tools

**Popular Options:**
- Selenium WebDriver
- Cypress
- Playwright
- Puppeteer

### Using Selenium (Python)

**Installation:**
```bash
pip install selenium
```

**Example Test:**
```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Initialize driver
driver = webdriver.Chrome()

# Navigate to form
driver.get('http://localhost:8080')

# Dismiss disclaimer
dismiss_btn = driver.find_element(By.ID, 'acceptDisclaimer')
dismiss_btn.click()

# Fill form fields
first_name = driver.find_element(By.ID, 'firstName')
first_name.send_keys('John')

last_name = driver.find_element(By.ID, 'lastName')
last_name.send_keys('Doe')

email = driver.find_element(By.ID, 'email')
email.send_keys('john@example.com')

# Select from dropdown
sport_select = Select(driver.find_element(By.ID, 'sport'))
sport_select.select_by_value('football')

# Wait for leagues to load
wait = WebDriverWait(driver, 10)
league_select = wait.until(
    EC.presence_of_element_located((By.ID, 'league'))
)
Select(league_select).select_by_index(1)

# Submit form
submit_btn = driver.find_element(By.ID, 'submit-button')
submit_btn.click()

# Verify success
success_msg = wait.until(
    EC.presence_of_element_located((By.ID, 'successMessage'))
)
assert 'successfully' in success_msg.text.lower()

driver.quit()
```

### Using Cypress

**Installation:**
```bash
npm install --save-dev cypress
```

**Example Test:**
```javascript
describe('ProBet Sports Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
    // Dismiss disclaimer
    cy.get('#acceptDisclaimer').click()
  })

  it('should fill form and submit', () => {
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('#email').type('john@example.com')
    cy.get('#password').type('SecurePass123')
    cy.get('#country').select('us')
    cy.get('#age').type('1990-01-15')

    cy.get('#sport').select('football')
    cy.get('#league').should('not.be.disabled')
    cy.get('#league').select(0)

    cy.get('#matchup').should('not.be.disabled')
    cy.get('#matchup').select(0)

    cy.get('input[value="moneyline"]').check()
    cy.get('#betAmount').type('100')
    cy.get('#odds').select('-110')

    cy.get('input[id="ageVerification"]').check()
    cy.get('input[id="terms"]').check()
    cy.get('input[id="gaming"]').check()

    cy.get('button[type="submit"]').click()

    cy.get('#successMessage').should('be.visible')
    cy.get('#successMessage').should('contain', 'Successfully')
  })
})
```

---

## Test Data

### Valid Test Data

```javascript
const validFormData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  password: "SecurePassword123",
  country: "us",
  birthdate: "1990-01-15",  // Age 33+
  sport: "football",
  league: "epl",
  matchup: "match-001",
  betType: "moneyline",
  betAmount: 50.00,
  odds: "-110",
  ageVerification: true,
  terms: true,
  gaming: true,
  newsletter: false
};
```

### Invalid Test Data

```javascript
const invalidFormData = {
  // Missing required fields
  firstName: "",
  
  // Invalid email
  email: "invalid.email",
  
  // Password too short
  password: "Short1",
  
  // Invalid age (under 18)
  birthdate: "2010-01-15",
  
  // Negative bet amount
  betAmount: -50,
  
  // Missing checkboxes
  ageVerification: false,
  terms: false
};
```

### Test Data for Each Field

| Field | Valid Examples | Invalid Examples |
|-------|---|---|
| First Name | John, María, José | (empty), 123, !@# |
| Last Name | Doe, O'Brien, Smith | (empty), 123, !@# |
| Email | test@example.com | invalid.email, test@ |
| Password | SecurePass123 | Short1, password |
| Country | us, uk, ca, au | invalid, 123 |
| Birthdate | 1990-01-15 | 2010-01-15 (under 18) |
| Sport | football, basketball | invalid, "" |
| League | epl, nba | invalid, "" |
| Matchup | Team A vs Team B | invalid, "" |
| Bet Type | moneyline, spread | invalid, "" |
| Bet Amount | 10, 50.50, 1000 | -10, 0, abc |
| Odds | -200, -110, +150 | invalid, "" |

---

## Validation Testing

### Field Validation Tests

#### Email Validation
```javascript
const testCases = [
  { email: "valid@example.com", expected: true },
  { email: "test.email+tag@example.co.uk", expected: true },
  { email: "invalid.email", expected: false },
  { email: "test@", expected: false },
  { email: "@example.com", expected: false },
  { email: "test @example.com", expected: false }
];

testCases.forEach(({ email, expected }) => {
  const result = validator.validateEmail(email);
  console.assert(
    result.isValid === expected,
    `Email ${email} validation failed`
  );
});
```

#### Password Validation
```javascript
const testCases = [
  { password: "ShortPass1", length: 10, expected: true },
  { password: "Short1", length: 6, expected: false },
  { password: "", length: 0, expected: false },
  { password: "ValidPassword123", length: 16, expected: true }
];

testCases.forEach(({ password, length, expected }) => {
  const result = validator.validatePassword(password);
  console.assert(
    result.isValid === expected,
    `Password length ${length} validation failed`
  );
});
```

#### Age Validation
```javascript
const testCases = [
  { birthdate: "2000-01-01", currentYear: 2026, expected: true },   // 26 years old
  { birthdate: "2010-01-01", currentYear: 2026, expected: false },  // 16 years old
  { birthdate: "1950-01-01", currentYear: 2026, expected: true },   // 76 years old
  { birthdate: "1800-01-01", currentYear: 2026, expected: false }   // 226 years old (invalid)
];
```

#### Bet Amount Validation
```javascript
const testCases = [
  { amount: 10, expected: true },
  { amount: 0, expected: false },
  { amount: -50, expected: false },
  { amount: 0.01, expected: true },
  { amount: 100000, expected: true }
];
```

---

## API Testing

### Test API Endpoints

```bash
# Test endpoint: GET /api/sports
curl http://localhost:3000/api/sports

# Test endpoint: GET /api/leagues/:sport
curl http://localhost:3000/api/leagues/football

# Test endpoint: GET /api/matchups/:sport/:league
curl http://localhost:3000/api/matchups/football/epl
```

### Test Error Scenarios

```bash
# Test 404 error (invalid sport)
curl http://localhost:3000/api/leagues/invalidsport
# Expected: 404 error

# Test 500 error (stop API server, then)
curl http://localhost:3000/api/sports
# Expected: Connection refused
```

### Test Response Data

```javascript
async function validateAPIResponses() {
  // Test sports endpoint
  const sportsRes = await fetch('http://localhost:3000/api/sports');
  const sports = await sportsRes.json();
  
  console.assert(
    Array.isArray(sports),
    'Sports should be array'
  );
  console.assert(
    sports.length > 0,
    'Sports array should not be empty'
  );
  console.assert(
    sports[0].id && sports[0].name,
    'Sports should have id and name'
  );
  
  // Test leagues endpoint
  const leaguesRes = await fetch(
    'http://localhost:3000/api/leagues/football'
  );
  const leagues = await leaguesRes.json();
  
  console.assert(
    Array.isArray(leagues),
    'Leagues should be array'
  );
}
```

---

## Best Practices

### Testing Checklist

Before shipping code:

- [ ] Run all smoke tests
- [ ] Test all form fields
- [ ] Test all validation rules
- [ ] Test API integration
- [ ] Test error scenarios
- [ ] Test responsive design
- [ ] Test form persistence
- [ ] Test browser compatibility
- [ ] Clear browser cache and test
- [ ] No console errors in DevTools

### Test Organization

**Structure:**
```
tests/
├── unit/              # Individual function tests
├── integration/       # Feature tests
├── e2e/              # End-to-end tests
└── fixtures/         # Test data
```

### Useful Test IDs

All form elements have `data-testid` attributes:

```html
<!-- Account Section -->
<input data-testid="first-name-input" />
<input data-testid="email-input" />
<input data-testid="password-input" />

<!-- Bet Placement -->
<select data-testid="sport-select" />
<select data-testid="league-select" />
<select data-testid="matchup-select" />
<input data-testid="bet-amount-input" />

<!-- Buttons -->
<button data-testid="submit-button" />
<button data-testid="reset-button" />

<!-- Messages -->
<div data-testid="success-message" />
<div data-testid="api-notification" />
```

### Use Test IDs for Automation

```python
# Selenium with test IDs
from selenium.webdriver.common.by import By

# Find elements by test ID
element = driver.find_element(By.CSS_SELECTOR, '[data-testid="first-name-input"]')
```

---

## Test Results Documentation

### Sample Test Report

```
ProBet Sports - Test Results
Date: 2026-01-27
Tester: QA Team

Smoke Test: PASS ✓
- Form loads: PASS
- Can fill fields: PASS
- Can submit: PASS

Feature Tests:
- Account Information: PASS (8/8)
- Bet Placement: PASS (7/7)
- Validation: PASS (12/12)
- API Integration: PASS (6/6)
- Form Persistence: PASS (4/4)

Total: PASS (37/37 tests)

Issues Found: None
Blockers: None
Recommendations: Ready for deployment
```

---

## Continuous Testing

### Automated Test Suite

```bash
# Run all tests
npm test

# Run specific test
npm test -- --testNamePattern="validates email"

# Run with coverage
npm test -- --coverage
```

### CI/CD Integration

Example GitHub Actions:

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - run: npm test
```

---

## Troubleshooting Tests

### Test Times Out

**Causes:**
- API too slow
- Element not found
- Server not running

**Solutions:**
- Increase timeout: `cy.get(..., { timeout: 10000 })`
- Start API: `npm run server`
- Check element exists

### Test Fails Intermittently

**Causes:**
- Race conditions
- API latency
- Timing issues

**Solutions:**
- Add explicit waits
- Increase timeouts
- Use cy.intercept() for API mocking

### Can't Find Element

**Causes:**
- Wrong selector
- Element not loaded
- Page structure changed

**Solutions:**
- Verify element exists: `cy.get(...).should('exist')`
- Wait for element: `cy.get(..., { timeout: 10000 })`
- Use data-testid instead of class names

---

## Next Steps

- 🔧 See [Development Guide](DEVELOPMENT.md)
- 📊 See [API Reference](API_REFERENCE.md)
- 🚀 See [Deployment Guide](DEPLOYMENT.md)

---

**Questions?** Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) →
