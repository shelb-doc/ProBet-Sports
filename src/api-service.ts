import { config } from './config';

interface League {
    id: string;
    name: string;
}

interface Matchup {
    id: string;
    teams: string;
    odds?: string[];
}

export class BettingAPIService {
    private apiBaseUrl: string;

    constructor() {
        this.apiBaseUrl = config.get('apiBaseUrl');
        config.log('BettingAPIService initialized with API URL', { url: this.apiBaseUrl });
    }

    async fetchLeagues(sport: string): Promise<League[]> {
        try {
            const url = `${this.apiBaseUrl}/leagues/${sport}`;
            config.log('Fetching leagues', { sport, url });

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch leagues: ${response.statusText}`);
            }
            const data = await response.json();
            config.log('Leagues fetched successfully', { count: data.length });
            return data;
        } catch (error) {
            config.error('Error fetching leagues', error);
            throw error;
        }
    }

    async fetchMatchups(sport: string, league: string): Promise<Matchup[]> {
        try {
            const url = `${this.apiBaseUrl}/matchups/${sport}/${league}`;
            config.log('Fetching matchups', { sport, league, url });

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch matchups: ${response.statusText}`);
            }
            const data = await response.json();
            config.log('Matchups fetched successfully', { count: data.length });
            return data;
        } catch (error) {
            config.error('Error fetching matchups', error);
            throw error;
        }
    }

    populateLeagues(leagues: League[]): void {
        const leagueSelect = document.getElementById('league') as HTMLSelectElement;
        leagueSelect.innerHTML = '<option value="">Select league</option>';

        leagues.forEach(league => {
            const option = document.createElement('option');
            option.value = league.id;
            option.textContent = league.name;
            leagueSelect.appendChild(option);
        });
    }

    populateMatchups(matchups: Matchup[]): void {
        const matchupSelect = document.getElementById('matchup') as HTMLSelectElement;
        matchupSelect.innerHTML = '<option value="">Choose teams</option>';

        matchups.forEach(matchup => {
            const option = document.createElement('option');
            option.value = matchup.id;
            option.textContent = matchup.teams;
            matchupSelect.appendChild(option);
        });
    }
}
