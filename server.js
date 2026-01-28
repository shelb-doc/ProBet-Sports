const express = require('express');
const cors = require('cors');
const bettingRoutes = require('./routes/betting-routes');
const { errorHandler, notFoundHandler } = require('./middleware/error-handler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (development)
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next();
    });
}

// API Routes
app.use('/api', bettingRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`🎲 Betting API Server running on http://localhost:${PORT}`);
    console.log(`📊 Available endpoints:`);
    console.log(`   - GET /api/sports - Get all sports`);
    console.log(`   - GET /api/leagues/:sport - Get leagues for a sport`);
    console.log(`   - GET /api/matchups/:sport/:league - Get matchups for a league`);
    console.log(`   - GET /api/health - Health check`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\nSIGINT received, shutting down gracefully...');
    process.exit(0);
});

module.exports = app;
