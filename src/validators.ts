interface ValidationResult {
    isValid: boolean;
    message: string;
}

export class FormValidator {
    validateRequired(value: string, fieldName: string): ValidationResult {
        if (!value || value.trim() === '') {
            return {
                isValid: false,
                message: `${fieldName} is required`
            };
        }
        return { isValid: true, message: '' };
    }

    validateEmail(email: string): ValidationResult {
        if (!email || email.trim() === '') {
            return {
                isValid: false,
                message: 'Email is required'
            };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                isValid: false,
                message: 'Please enter a valid email address'
            };
        }

        return { isValid: true, message: '' };
    }

    validatePassword(password: string): ValidationResult {
        if (!password || password.trim() === '') {
            return {
                isValid: false,
                message: 'Password is required'
            };
        }

        if (password.length < 8) {
            return {
                isValid: false,
                message: 'Password must be at least 8 characters long'
            };
        }

        return { isValid: true, message: '' };
    }

    validateAge(birthdate: string): ValidationResult {
        if (!birthdate) {
            return {
                isValid: false,
                message: 'Date of birth is required'
            };
        }

        const birth = new Date(birthdate);
        const today = new Date();

        // Calculate age
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        if (age < 18) {
            return {
                isValid: false,
                message: 'You must be at least 18 years old to place bets'
            };
        }

        if (age > 120) {
            return {
                isValid: false,
                message: 'Please enter a valid date of birth'
            };
        }

        return { isValid: true, message: '' };
    }

    validateBetAmount(amount: number): ValidationResult {
        if (isNaN(amount) || amount <= 0) {
            return {
                isValid: false,
                message: 'Please enter a valid bet amount'
            };
        }

        if (amount < 1) {
            return {
                isValid: false,
                message: 'Minimum bet amount is $1.00'
            };
        }

        if (amount > 10000) {
            return {
                isValid: false,
                message: 'Maximum bet amount is $10,000.00'
            };
        }

        return { isValid: true, message: '' };
    }
}
