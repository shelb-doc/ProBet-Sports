// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Default error
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle specific error types
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Error: ' + err.message;
    }

    if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid request parameter';
    }

    res.status(statusCode).json({
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

// 404 handler
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        error: 'Route not found'
    });
};

module.exports = {
    errorHandler,
    notFoundHandler
};
