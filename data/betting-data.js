// Sports betting data structure
const bettingData = {
    football: {
        name: "Football (Soccer)",
        leagues: {
            "premier-league": {
                name: "Premier League",
                matchups: [
                    { id: "mu-liv", teams: "Man United vs Liverpool", odds: ["-150", "+130"] },
                    { id: "che-ars", teams: "Chelsea vs Arsenal", odds: ["+110", "-120"] },
                    { id: "mci-tot", teams: "Man City vs Tottenham", odds: ["-200", "+170"] },
                    { id: "new-avl", teams: "Newcastle vs Aston Villa", odds: ["+120", "+100"] }
                ]
            },
            "la-liga": {
                name: "La Liga",
                matchups: [
                    { id: "bar-rm", teams: "Barcelona vs Real Madrid", odds: ["+105", "+110"] },
                    { id: "atm-sev", teams: "Atletico Madrid vs Sevilla", odds: ["-130", "+145"] },
                    { id: "val-bil", teams: "Valencia vs Athletic Bilbao", odds: ["+100", "+115"] }
                ]
            },
            "champions-league": {
                name: "UEFA Champions League",
                matchups: [
                    { id: "bay-psg", teams: "Bayern Munich vs PSG", odds: ["-110", "+125"] },
                    { id: "mci-int", teams: "Man City vs Inter Milan", odds: ["-180", "+160"] },
                    { id: "liv-rm", teams: "Liverpool vs Real Madrid", odds: ["+140", "-115"] }
                ]
            }
        }
    },
    basketball: {
        name: "Basketball",
        leagues: {
            "nba": {
                name: "NBA",
                matchups: [
                    { id: "lal-cel", teams: "Lakers vs Celtics", odds: ["+120", "-140"] },
                    { id: "gsw-mia", teams: "Warriors vs Heat", odds: ["-150", "+130"] },
                    { id: "bkn-mil", teams: "Nets vs Bucks", odds: ["+200", "-220"] },
                    { id: "phx-den", teams: "Suns vs Nuggets", odds: ["-105", "+100"] }
                ]
            }
        }
    },
    baseball: {
        name: "Baseball",
        leagues: {
            "mlb": {
                name: "MLB",
                matchups: [
                    { id: "nyy-bos", teams: "Yankees vs Red Sox", odds: ["-130", "+120"] },
                    { id: "lad-sf", teams: "Dodgers vs Giants", odds: ["-110", "+105"] },
                    { id: "hou-oak", teams: "Astros vs Athletics", odds: ["-180", "+160"] },
                    { id: "atl-phi", teams: "Braves vs Phillies", odds: ["+100", "-110"] }
                ]
            }
        }
    },
    hockey: {
        name: "Ice Hockey",
        leagues: {
            "nhl": {
                name: "NHL",
                matchups: [
                    { id: "tor-mtl", teams: "Maple Leafs vs Canadiens", odds: ["-140", "+125"] },
                    { id: "bos-nyr", teams: "Bruins vs Rangers", odds: ["-120", "+110"] },
                    { id: "edm-cgy", teams: "Oilers vs Flames", odds: ["+105", "-115"] },
                    { id: "tb-fla", teams: "Lightning vs Panthers", odds: ["+115", "-125"] }
                ]
            }
        }
    },
    tennis: {
        name: "Tennis",
        leagues: {
            "atp-tour": {
                name: "ATP Tour",
                matchups: [
                    { id: "djok-nad", teams: "Djokovic vs Nadal", odds: ["-150", "+135"] },
                    { id: "alc-med", teams: "Alcaraz vs Medvedev", odds: ["-110", "+100"] },
                    { id: "sin-tsit", teams: "Sinner vs Tsitsipas", odds: ["+120", "-130"] }
                ]
            },
            "wta-tour": {
                name: "WTA Tour",
                matchups: [
                    { id: "swi-sab", teams: "Swiatek vs Sabalenka", odds: ["-125", "+115"] },
                    { id: "gau-ryb", teams: "Gauff vs Rybakina", odds: ["+110", "-120"] }
                ]
            }
        }
    },
    boxing: {
        name: "Boxing/MMA",
        leagues: {
            "ufc": {
                name: "UFC",
                matchups: [
                    { id: "jones-gan", teams: "Jon Jones vs Ciryl Gane", odds: ["-200", "+175"] },
                    { id: "volk-top", teams: "Volkanovski vs Topuria", odds: ["-140", "+125"] },
                    { id: "makh-oliv", teams: "Makhachev vs Oliveira", odds: ["-180", "+160"] }
                ]
            },
            "boxing": {
                name: "Professional Boxing",
                matchups: [
                    { id: "fury-usy", teams: "Tyson Fury vs Oleksandr Usyk", odds: ["-110", "+100"] },
                    { id: "can-ben", teams: "Canelo vs Benavidez", odds: ["-130", "+115"] }
                ]
            }
        }
    }
};

module.exports = bettingData;
