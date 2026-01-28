export class PayoutCalculator {
    /**
     * Calculate the potential payout based on bet amount and odds
     * @param betAmount - The amount being wagered
     * @param odds - The odds value (e.g., "-150", "+200")
     * @returns The total payout including original bet
     */
    static calculatePayout(betAmount: number, odds: string): number {
        if (!betAmount || betAmount <= 0 || !odds) {
            return 0;
        }

        const oddsValue = parseInt(odds);
        let payout = 0;

        if (oddsValue > 0) {
            // Positive odds (underdog)
            payout = betAmount + (betAmount * (oddsValue / 100));
        } else {
            // Negative odds (favorite)
            payout = betAmount + (betAmount * (100 / Math.abs(oddsValue)));
        }

        return payout;
    }

    /**
     * Format payout as currency string
     * @param amount - The amount to format
     * @returns Formatted currency string (e.g., "$123.45")
     */
    static formatCurrency(amount: number): string {
        return `$${amount.toFixed(2)}`;
    }
}
