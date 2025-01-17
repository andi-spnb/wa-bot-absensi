const pool = require('../config/database');

async function logger(req, res, next) {
    const start = Date.now();

    // Add response listener
    res.on('finish', async () => {
        const duration = Date.now() - start;
        const { method, originalUrl, ip } = req;
        const statusCode = res.statusCode;

        // Log only API requests
        if (originalUrl.startsWith('/api')) {
            try {
                await pool.query(
                    'INSERT INTO api_logs (method, url, status_code, duration, ip_address) VALUES (?, ?, ?, ?, ?)',
                    [method, originalUrl, statusCode, duration, ip]
                );
            } catch (error) {
                console.error('Error logging API request:', error);
            }
        }
    });

    next();
}

module.exports = logger;