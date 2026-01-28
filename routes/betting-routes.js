const express = require('express');
const router = express.Router();
const bettingData = require('../data/betting-data');

// Validation middleware
const validateSport = (req, res, next) => {
    const { sport } = req.params;
    if (!sport || !bettingData[sport]) {
        return res.status(404).json({ error: 'Sport not found' });
    }
    next();
};

const validateLeague = (req, res, next) => {
    const { sport, league } = req.params;
    if (!bettingData[sport]?.leagues[league]) {
        return res.status(404).json({ error: 'League not found' });
    }
    next();
};

// Get all sports
router.get('/sports', (req, res) => {
    const sports = Object.keys(bettingData).map(key => ({
        id: key,
        name: bettingData[key].name
    }));
    res.json(sports);
});

// Get leagues for a specific sport
router.get('/leagues/:sport', validateSport, (req, res) => {
    const { sport } = req.params;

    const leagues = Object.keys(bettingData[sport].leagues).map(key => ({
        id: key,
        name: bettingData[sport].leagues[key].name
    }));

    res.json(leagues);
});

// Get matchups for a specific league
router.get('/matchups/:sport/:league', validateSport, validateLeague, (req, res) => {
    const { sport, league } = req.params;

    const matchups = bettingData[sport].leagues[league].matchups;
    res.json(matchups);
});

// Get all data structure (for reference)
router.get('/data', (req, res) => {
    res.json(bettingData);
});

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Betting API is running' });
});

module.exports = router;
