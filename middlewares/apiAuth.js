// Update apiAuth.js to return JSON response instead of redirect
const pool = require('../config/database');

async function apiKeyAuth(req, res, next) {
    const apiKey = req.header('X-API-Key');
    
    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: 'API key missing'
        });
    }

    try {
        const [rows] = await pool.query(
            'SELECT * FROM api_keys WHERE api_key = ? AND is_active = true',
            [apiKey]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or inactive API key'
            });
        }

        req.apiKey = rows[0];
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Authentication error'
        });
    }
}

module.exports = apiKeyAuth;