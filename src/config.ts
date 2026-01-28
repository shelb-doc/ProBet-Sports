/**
 * Environment Configuration
 * 
 * This module provides environment-specific configuration for the ProBet Sports application.
 * Supports development, staging, and production environments.
 * 
 * Configuration is determined by:
 * 1. REACT_APP_ENV environment variable (if available)
 * 2. NODE_ENV environment variable (if available)
 * 3. Current hostname/origin detection
 * 4. Default to development
 */

interface Config {
    environment: 'development' | 'staging' | 'production';
    apiBaseUrl: string;
    apiTimeout: number;
    enableLogging: boolean;
    enableAutoSave: boolean;
}

class ConfigManager {
    private static instance: ConfigManager;
    private config: Config;

    private constructor() {
        this.config = this.loadConfig();
    }

    public static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }

    private loadConfig(): Config {
        const environment = this.detectEnvironment();
        const apiBaseUrl = this.getApiBaseUrl(environment);

        return {
            environment,
            apiBaseUrl,
            apiTimeout: 10000, // 10 seconds
            enableLogging: environment !== 'production',
            enableAutoSave: true
        };
    }

    private detectEnvironment(): 'development' | 'staging' | 'production' {
        // Check for explicit environment variable (if using build tools)
        const envVar = (window as any).REACT_APP_ENV || (window as any).ENV;
        if (envVar) {
            const normalizedEnv = envVar.toLowerCase();
            if (normalizedEnv === 'production' || normalizedEnv === 'prod') {
                return 'production';
            }
            if (normalizedEnv === 'staging' || normalizedEnv === 'stage') {
                return 'staging';
            }
        }

        // Check hostname for environment detection
        const hostname = window.location.hostname;

        // Production detection
        if (
            hostname === 'probet-sports.com' ||
            hostname === 'www.probet-sports.com' ||
            hostname.includes('prod')
        ) {
            return 'production';
        }

        // Staging detection
        if (hostname.includes('staging') || hostname.includes('stage')) {
            return 'staging';
        }

        // Default to development for localhost and other cases
        return 'development';
    }

    private getApiBaseUrl(environment: 'development' | 'staging' | 'production'): string {
        switch (environment) {
            case 'production':
                // Update this to your production API endpoint
                return 'https://api.probet-sports.com';

            case 'staging':
                // Update this to your staging API endpoint
                return 'https://staging-api.probet-sports.com';

            case 'development':
            default:
                // Check if running on localhost with custom port
                const hostname = window.location.hostname;
                const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

                if (isLocalhost) {
                    // Default to port 3000 for local development
                    return `http://${hostname}:3000/api`;
                }

                // Fallback
                return 'http://localhost:3000/api';
        }
    }

    public get<K extends keyof Config>(key: K): Config[K] {
        return this.config[key];
    }

    public getAll(): Readonly<Config> {
        return Object.freeze({ ...this.config });
    }

    public log(message: string, data?: any): void {
        if (this.config.enableLogging) {
            if (data) {
                console.log(`[ProBet] ${message}`, data);
            } else {
                console.log(`[ProBet] ${message}`);
            }
        }
    }

    public warn(message: string, data?: any): void {
        if (this.config.enableLogging) {
            if (data) {
                console.warn(`[ProBet] ${message}`, data);
            } else {
                console.warn(`[ProBet] ${message}`);
            }
        }
    }

    public error(message: string, data?: any): void {
        // Always log errors regardless of logging setting
        if (data) {
            console.error(`[ProBet] ${message}`, data);
        } else {
            console.error(`[ProBet] ${message}`);
        }
    }
}

// Export a singleton instance
export const config = ConfigManager.getInstance();

// Utility function for easy access
export const getConfig = () => config.getAll();

// Utility function for easy logging
export const logConfig = (message: string, data?: any) => config.log(message, data);
export const warnConfig = (message: string, data?: any) => config.warn(message, data);
export const errorConfig = (message: string, data?: any) => config.error(message, data);

// Log configuration on load (only in development)
if (typeof window !== 'undefined') {
    const currentConfig = getConfig();
    config.log('Configuration loaded', {
        environment: currentConfig.environment,
        apiBaseUrl: currentConfig.apiBaseUrl,
        apiTimeout: currentConfig.apiTimeout
    });
}

export default config;
