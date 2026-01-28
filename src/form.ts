import { FormValidator } from './validators';
import { BettingAPIService } from './api-service';
import { PayoutCalculator } from './payout-calculator';

interface BetFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    country: string;
    birthdate: string;
    sport: string;
    league: string;
    matchup: string;
    betType: string;
    betAmount: number;
    odds: string;
    favoriteSports: string[];
    ageVerification: boolean;
    terms: boolean;
    newsletter: boolean;
}

class BettingFormHandler {
    private form: HTMLFormElement;
    private successMessage: HTMLElement;
    private submittedDataContainer: HTMLElement;
    private payoutDisplay: HTMLElement;
    private validator: FormValidator;
    private apiService: BettingAPIService;
    private apiNotification: HTMLElement;
    private formAutoSaveStatus: HTMLElement;
    private formRecoveryNotification: HTMLElement;
    private autoSaveTimer: number | null = null;
    private readonly STORAGE_KEY = 'probet_form_data';
    private readonly AUTO_SAVE_DELAY = 2000; // 2 seconds

    constructor() {
        this.form = document.getElementById('registrationForm') as HTMLFormElement;
        this.successMessage = document.getElementById('successMessage') as HTMLElement;
        this.submittedDataContainer = document.getElementById('submittedData') as HTMLElement;
        this.payoutDisplay = document.querySelector('[data-testid="payout-amount"]') as HTMLElement;
        this.apiNotification = document.getElementById('apiNotification') as HTMLElement;
        this.formAutoSaveStatus = document.getElementById('formAutoSaveStatus') as HTMLElement;
        this.formRecoveryNotification = document.getElementById('formRecoveryNotification') as HTMLElement;

        this.validator = new FormValidator();
        this.apiService = new BettingAPIService();

        this.initialize();
    }

    private initialize(): void {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.form.addEventListener('reset', () => this.handleReset());

        // Restore form data from localStorage
        this.restoreFormData();

        // Add real-time validation
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input as HTMLInputElement));
            input.addEventListener('change', () => this.scheduleAutoSave());
            input.addEventListener('input', () => this.scheduleAutoSave());
        });

        // Add payout calculator
        const betAmountInput = document.getElementById('betAmount') as HTMLInputElement;
        const oddsSelect = document.getElementById('odds') as HTMLSelectElement;

        if (betAmountInput && oddsSelect) {
            betAmountInput.addEventListener('input', () => this.calculatePayout());
            oddsSelect.addEventListener('change', () => this.calculatePayout());
        }

        // Setup dynamic dropdowns
        this.setupDynamicDropdowns();

        // Setup form recovery dismiss button
        const dismissRecoveryBtn = document.getElementById('dismissRecovery') as HTMLElement;
        if (dismissRecoveryBtn) {
            dismissRecoveryBtn.addEventListener('click', () => {
                this.formRecoveryNotification.classList.remove('show');
                this.formRecoveryNotification.classList.add('hidden');
            });
        }
    }

    private scheduleAutoSave(): void {
        if (this.autoSaveTimer) {
            clearTimeout(this.autoSaveTimer);
        }

        this.autoSaveTimer = window.setTimeout(() => {
            this.saveFormData();
        }, this.AUTO_SAVE_DELAY);
    }

    private saveFormData(): void {
        try {
            const formData = this.collectFormData();
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(formData));
            
            // Show brief save status
            this.showAutoSaveStatus('Saved');
        } catch (error) {
            console.error('Error saving form data:', error);
        }
    }

    private restoreFormData(): void {
        try {
            const savedData = localStorage.getItem(this.STORAGE_KEY);
            if (savedData) {
                const formData: BetFormData = JSON.parse(savedData);
                this.populateFormWithData(formData);
                
                // Show recovery notification
                this.showFormRecoveryNotification();
                
                // Clear storage after recovery
                localStorage.removeItem(this.STORAGE_KEY);
            }
        } catch (error) {
            console.error('Error restoring form data:', error);
            localStorage.removeItem(this.STORAGE_KEY);
        }
    }

    private populateFormWithData(data: BetFormData): void {
        this.setInputValue('firstName', data.firstName);
        this.setInputValue('lastName', data.lastName);
        this.setInputValue('email', data.email);
        this.setInputValue('password', data.password);
        this.setInputValue('country', data.country);
        this.setInputValue('age', data.birthdate);
        this.setInputValue('sport', data.sport);
        this.setInputValue('league', data.league);
        this.setInputValue('matchup', data.matchup);
        this.setRadioValue('betType', data.betType);
        this.setInputValue('betAmount', data.betAmount.toString());
        this.setInputValue('odds', data.odds);
        
        this.setCheckboxValue('ageVerification', data.ageVerification);
        this.setCheckboxValue('terms', data.terms);
        this.setCheckboxValue('newsletter', data.newsletter);

        data.favoriteSports.forEach(sport => {
            const checkbox = document.querySelector(`input[name="favoriteSports"][value="${sport}"]`) as HTMLInputElement;
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    }

    private setInputValue(id: string, value: string): void {
        const element = document.getElementById(id) as HTMLInputElement | HTMLSelectElement;
        if (element) {
            element.value = value;
        }
    }

    private setRadioValue(name: string, value: string): void {
        const radio = document.querySelector(`input[name="${name}"][value="${value}"]`) as HTMLInputElement;
        if (radio) {
            radio.checked = true;
        }
    }

    private setCheckboxValue(id: string, value: boolean): void {
        const checkbox = document.getElementById(id) as HTMLInputElement;
        if (checkbox) {
            checkbox.checked = value;
        }
    }

    private showAutoSaveStatus(message: string): void {
        this.formAutoSaveStatus.textContent = message;
        this.formAutoSaveStatus.classList.add('show');

        setTimeout(() => {
            this.formAutoSaveStatus.classList.remove('show');
        }, 2000);
    }

    private showFormRecoveryNotification(): void {
        this.formRecoveryNotification.classList.remove('hidden');
        this.formRecoveryNotification.classList.add('show');

        setTimeout(() => {
            if (this.formRecoveryNotification.classList.contains('show')) {
                this.formRecoveryNotification.classList.remove('show');
                this.formRecoveryNotification.classList.add('hidden');
            }
        }, 8000);
    }

    private showApiNotification(message: string, type: 'error' | 'success' | 'warning' = 'error'): void {
        this.apiNotification.textContent = message;
        this.apiNotification.classList.remove('hidden', 'success', 'warning', 'error');
        this.apiNotification.classList.add('show', type);

        setTimeout(() => {
            this.apiNotification.classList.remove('show');
            this.apiNotification.classList.add('hidden');
        }, 5000);
    }

    private hideApiError(fieldName: string): void {
        const errorElement = document.querySelector(`[data-testid="${fieldName}-api-error"]`) as HTMLElement;
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }

    private showApiError(fieldName: string, message: string): void {
        const errorElement = document.querySelector(`[data-testid="${fieldName}-api-error"]`) as HTMLElement;
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    private showLoader(loaderId: string): void {
        const loader = document.getElementById(loaderId) as HTMLElement;
        if (loader) {
            loader.classList.remove('hidden');
        }
    }

    private hideLoader(loaderId: string): void {
        const loader = document.getElementById(loaderId) as HTMLElement;
        if (loader) {
            loader.classList.add('hidden');
        }
    }

    private setupDynamicDropdowns(): void {
        const sportSelect = document.getElementById('sport') as HTMLSelectElement;
        const leagueSelect = document.getElementById('league') as HTMLSelectElement;
        const matchupSelect = document.getElementById('matchup') as HTMLSelectElement;

        // When sport changes, load leagues
        sportSelect.addEventListener('change', async () => {
            const sportValue = sportSelect.value;

            // Reset league and matchup
            leagueSelect.innerHTML = '<option value="">Select league</option>';
            leagueSelect.disabled = true;
            matchupSelect.innerHTML = '<option value="">Select a league first</option>';
            matchupSelect.disabled = true;
            this.hideApiError('league');

            if (sportValue) {
                try {
                    this.showLoader('leagueLoader');
                    const leagues = await this.apiService.fetchLeagues(sportValue);
                    this.apiService.populateLeagues(leagues);
                    leagueSelect.disabled = false;
                    this.hideApiError('league');
                } catch (error) {
                    const errorMsg = 'Failed to load leagues. Please try again.';
                    leagueSelect.innerHTML = '<option value="">Error loading leagues</option>';
                    this.showApiError('league', errorMsg);
                    this.showApiNotification(errorMsg, 'error');
                } finally {
                    this.hideLoader('leagueLoader');
                }
            }
        });

        // When league changes, load matchups
        leagueSelect.addEventListener('change', async () => {
            const sportValue = sportSelect.value;
            const leagueValue = leagueSelect.value;

            // Reset matchup
            matchupSelect.innerHTML = '<option value="">Choose teams</option>';
            matchupSelect.disabled = true;
            this.hideApiError('matchup');

            if (sportValue && leagueValue) {
                try {
                    this.showLoader('matchupLoader');
                    const matchups = await this.apiService.fetchMatchups(sportValue, leagueValue);
                    this.apiService.populateMatchups(matchups);
                    matchupSelect.disabled = false;
                    this.hideApiError('matchup');
                } catch (error) {
                    const errorMsg = 'Failed to load matchups. Please try again.';
                    matchupSelect.innerHTML = '<option value="">Error loading matchups</option>';
                    this.showApiError('matchup', errorMsg);
                    this.showApiNotification(errorMsg, 'error');
                } finally {
                    this.hideLoader('matchupLoader');
                }
            }
        });
    }

    private calculatePayout(): void {
        const betAmount = parseFloat((document.getElementById('betAmount') as HTMLInputElement).value) || 0;
        const odds = (document.getElementById('odds') as HTMLSelectElement).value;

        const payout = PayoutCalculator.calculatePayout(betAmount, odds);
        this.payoutDisplay.textContent = PayoutCalculator.formatCurrency(payout);
    }

    private handleSubmit(event: Event): void {
        event.preventDefault();

        // Clear previous errors
        this.clearAllErrors();

        // Validate all fields
        if (!this.validateForm()) {
            return;
        }

        // Collect form data
        const formData = this.collectFormData();

        // Display success message
        this.displaySuccess(formData);
    }

    private handleReset(): void {
        this.clearAllErrors();
        this.successMessage.style.display = 'none';
        this.form.style.display = 'block';
        this.payoutDisplay.textContent = '$0.00';
        localStorage.removeItem(this.STORAGE_KEY);
        this.showApiNotification('Form cleared and auto-saved data removed', 'success');
    }

    private validateForm(): boolean {
        const validations = [
            { value: this.getInputValue('firstName'), validator: () => this.validator.validateRequired(this.getInputValue('firstName'), 'First name'), errorId: 'first-name-error' },
            { value: this.getInputValue('lastName'), validator: () => this.validator.validateRequired(this.getInputValue('lastName'), 'Last name'), errorId: 'last-name-error' },
            { value: this.getInputValue('email'), validator: () => this.validator.validateEmail(this.getInputValue('email')), errorId: 'email-error' },
            { value: this.getInputValue('password'), validator: () => this.validator.validatePassword(this.getInputValue('password')), errorId: 'password-error' },
            { value: this.getInputValue('country'), validator: () => this.validator.validateRequired(this.getInputValue('country'), 'Country'), errorId: 'country-error' },
            { value: this.getInputValue('age'), validator: () => this.validator.validateAge(this.getInputValue('age')), errorId: 'age-error' },
            { value: this.getInputValue('sport'), validator: () => ({ isValid: !!this.getInputValue('sport'), message: 'Please select a sport' }), errorId: 'sport-error' },
            { value: this.getInputValue('league'), validator: () => ({ isValid: !!this.getInputValue('league'), message: 'Please select a league' }), errorId: 'league-error' },
            { value: this.getInputValue('matchup'), validator: () => ({ isValid: !!this.getInputValue('matchup'), message: 'Please select a matchup' }), errorId: 'matchup-error' },
            { value: this.getRadioValue('betType'), validator: () => ({ isValid: !!this.getRadioValue('betType'), message: 'Please select a bet type' }), errorId: 'bettype-error' },
            { value: parseFloat(this.getInputValue('betAmount')), validator: () => this.validator.validateBetAmount(parseFloat(this.getInputValue('betAmount'))), errorId: 'bet-amount-error' },
            { value: this.getInputValue('odds'), validator: () => ({ isValid: !!this.getInputValue('odds'), message: 'Please select odds' }), errorId: 'odds-error' }
        ];

        let isValid = true;

        validations.forEach(({ validator, errorId }) => {
            const result = validator();
            if (!result.isValid) {
                this.showError(errorId, result.message);
                isValid = false;
            }
        });

        // Validate checkboxes
        const ageVerification = (document.getElementById('ageVerification') as HTMLInputElement).checked;
        if (!ageVerification) {
            this.showError('age-verification-error', 'You must confirm you are 18 or older');
            isValid = false;
        }

        const terms = (document.getElementById('terms') as HTMLInputElement).checked;
        if (!terms) {
            this.showError('terms-error', 'You must agree to the terms and conditions');
            isValid = false;
        }

        return isValid;
    }

    private validateField(input: HTMLInputElement): void {
        const fieldName = input.name;
        const errorId = `${input.id}-error`;

        const validationMap: { [key: string]: () => any } = {
            'firstName': () => this.validator.validateRequired(input.value, fieldName),
            'lastName': () => this.validator.validateRequired(input.value, fieldName),
            'email': () => this.validator.validateEmail(input.value),
            'password': () => this.validator.validatePassword(input.value),
            'age': () => this.validator.validateAge(input.value),
            'betAmount': () => this.validator.validateBetAmount(parseFloat(input.value))
        };

        const validationFn = validationMap[fieldName];
        if (validationFn) {
            const result = validationFn();
            if (!result.isValid) {
                this.showError(errorId, result.message);
            } else {
                this.clearError(errorId);
            }
        }
    }

    private collectFormData(): BetFormData {
        return {
            firstName: this.getInputValue('firstName'),
            lastName: this.getInputValue('lastName'),
            email: this.getInputValue('email'),
            password: this.getInputValue('password'),
            country: this.getInputValue('country'),
            birthdate: this.getInputValue('age'),
            sport: this.getInputValue('sport'),
            league: this.getInputValue('league'),
            matchup: this.getInputValue('matchup'),
            betType: this.getRadioValue('betType'),
            betAmount: parseFloat(this.getInputValue('betAmount')),
            odds: this.getInputValue('odds'),
            favoriteSports: this.getCheckboxValues('favoriteSports'),
            ageVerification: (document.getElementById('ageVerification') as HTMLInputElement).checked,
            terms: (document.getElementById('terms') as HTMLInputElement).checked,
            newsletter: (document.getElementById('newsletter') as HTMLInputElement).checked
        };
    }

    private getInputValue(id: string): string {
        const element = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        return element ? element.value : '';
    }

    private getRadioValue(name: string): string {
        const radio = document.querySelector(`input[name="${name}"]:checked`) as HTMLInputElement;
        return radio ? radio.value : '';
    }

    private getCheckboxValues(name: string): string[] {
        const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`) as NodeListOf<HTMLInputElement>;
        return Array.from(checkboxes).map(cb => cb.value);
    }

    private showError(errorId: string, message: string): void {
        const errorElement = document.querySelector(`[data-testid="${errorId}"]`) as HTMLElement;
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    private clearError(errorId: string): void {
        const errorElement = document.querySelector(`[data-testid="${errorId}"]`) as HTMLElement;
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    private clearAllErrors(): void {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            (element as HTMLElement).textContent = '';
            (element as HTMLElement).style.display = 'none';
        });
    }

    private displaySuccess(formData: BetFormData): void {
        // Hide form
        this.form.style.display = 'none';

        // Show success message
        this.successMessage.style.display = 'block';

        // Calculate payout
        const payout = PayoutCalculator.calculatePayout(formData.betAmount, formData.odds);

        // Get bet type display name
        const betTypeNames: { [key: string]: string } = {
            'moneyline': 'Moneyline',
            'spread': 'Point Spread',
            'over-under': 'Over/Under',
            'parlay': 'Parlay'
        };

        // Get matchup display text
        const matchupSelect = document.getElementById('matchup') as HTMLSelectElement;
        const matchupText = matchupSelect.options[matchupSelect.selectedIndex].text;

        // Get sport display text
        const sportSelect = document.getElementById('sport') as HTMLSelectElement;
        const sportText = sportSelect.options[sportSelect.selectedIndex].text;

        // Get league display text
        const leagueSelect = document.getElementById('league') as HTMLSelectElement;
        const leagueText = leagueSelect.options[leagueSelect.selectedIndex].text;

        // Display submitted data
        const dataHTML = `
            <div class="bet-detail">
                <h3>Account Details</h3>
                <p><strong>Name:</strong> ${this.escapeHtml(formData.firstName)} ${this.escapeHtml(formData.lastName)}</p>
                <p><strong>Email:</strong> ${this.escapeHtml(formData.email)}</p>
                <p><strong>Country:</strong> ${this.escapeHtml(formData.country)}</p>
            </div>
            <div class="bet-detail highlight">
                <h3>Bet Details</h3>
                <p><strong>Sport:</strong> ${this.escapeHtml(sportText)}</p>
                <p><strong>League:</strong> ${this.escapeHtml(leagueText)}</p>
                <p><strong>Matchup:</strong> ${this.escapeHtml(matchupText)}</p>
                <p><strong>Bet Type:</strong> ${this.escapeHtml(betTypeNames[formData.betType])}</p>
                <p><strong>Odds:</strong> ${this.escapeHtml(formData.odds)}</p>
                <p class="amount"><strong>Bet Amount:</strong> ${PayoutCalculator.formatCurrency(formData.betAmount)}</p>
                <p class="payout"><strong>Potential Payout:</strong> ${PayoutCalculator.formatCurrency(payout)}</p>
            </div>
            ${formData.favoriteSports.length > 0 ? `
            <div class="bet-detail">
                <p><strong>Favorite Sports:</strong> ${this.escapeHtml(formData.favoriteSports.join(', '))}</p>
            </div>
            ` : ''}
        `;

        this.submittedDataContainer.innerHTML = dataHTML;
    }

    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    public placeAnotherBet(): void {
        location.reload();
    }
}

// Modal handler for Terms & Conditions and Responsible Gaming Policy
class ModalHandler {
    private modals: { [key: string]: HTMLElement };

    constructor() {
        this.modals = {
            terms: document.getElementById('termsModal') as HTMLElement,
            gaming: document.getElementById('gamingModal') as HTMLElement
        };

        this.initialize();
    }

    private initialize(): void {
        // Handle modal links
        const modalLinks = document.querySelectorAll('.terms-link');
        modalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const modalType = (link as HTMLElement).getAttribute('data-modal');
                if (modalType) {
                    this.openModal(modalType);
                }
            });
        });

        // Handle modal close buttons
        const closeButtons = document.querySelectorAll('.modal-close');
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modalType = (button as HTMLElement).getAttribute('data-close');
                if (modalType) {
                    this.closeModal(modalType);
                }
            });
        });

        // Close modal when clicking outside of it
        window.addEventListener('click', (event) => {
            Object.keys(this.modals).forEach(key => {
                if (event.target === this.modals[key]) {
                    this.closeModal(key);
                }
            });
        });

        // Close modal with ESC key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                Object.keys(this.modals).forEach(key => {
                    if (this.modals[key].classList.contains('active')) {
                        this.closeModal(key);
                    }
                });
            }
        });
    }

    private openModal(type: string): void {
        const modal = this.modals[type];
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    private closeModal(type: string): void {
        const modal = this.modals[type];
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// Disclaimer handler - blocks page until accepted
class DisclaimerHandler {
    private disclaimerModal: HTMLElement;
    private acceptButton: HTMLElement;

    constructor() {
        this.disclaimerModal = document.getElementById('disclaimerModal') as HTMLElement;
        this.acceptButton = document.getElementById('acceptDisclaimer') as HTMLElement;

        this.initialize();
    }

    private initialize(): void {
        // Prevent scrolling while disclaimer is shown
        document.body.style.overflow = 'hidden';

        // Handle accept button click
        this.acceptButton.addEventListener('click', () => {
            this.acceptDisclaimer();
        });
    }

    private acceptDisclaimer(): void {
        // Add fade out animation
        this.disclaimerModal.style.animation = 'fadeOut 0.3s ease';

        setTimeout(() => {
            this.disclaimerModal.classList.remove('active');
            this.disclaimerModal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
}

// Add fadeOut animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export for use in HTML
let formHandlerInstance: BettingFormHandler;

// Initialize all handlers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DisclaimerHandler();
    formHandlerInstance = new BettingFormHandler();
    new ModalHandler();
});

// Make placeAnotherBet available globally
(window as any).placeAnotherBet = () => {
    if (formHandlerInstance) {
        formHandlerInstance.placeAnotherBet();
    }
};
