const rateLimit = require('express-rate-limit');

// Create rate limiter for API endpoints
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: 'Terlalu banyak request, silakan coba lagi nanti'
    }
});

// Create rate limiter for login attempts
const loginLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 login attempts per hour
    message: {
        error: 'Terlalu banyak percobaan login, silakan coba lagi nanti'
    }
});

module.exports = { apiLimiter, loginLimiter };