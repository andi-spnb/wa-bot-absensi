const pool = require('../config/database');

class NotificationLog {
    static async create(data) {
        const { type, phone, message, status, error = null } = data;
        
        const [result] = await pool.query(
            'INSERT INTO notification_logs (type, phone, message, status, error) VALUES (?, ?, ?, ?, ?)',
            [type, phone, message, status, error]
        );

        return result.insertId;
    }

    static async getRecent(limit = 5) {
        const [rows] = await pool.query(
            'SELECT * FROM notification_logs ORDER BY created_at DESC LIMIT ?',
            [limit]
        );
        return rows;
    }

    static async getPaginated(page = 1, limit = 20) {
        const offset = (page - 1) * limit;
        
        const [rows] = await pool.query(
            'SELECT * FROM notification_logs ORDER BY created_at DESC LIMIT ? OFFSET ?',
            [limit, offset]
        );

        const [countResult] = await pool.query(
            'SELECT COUNT(*) as total FROM notification_logs'
        );

        return {
            logs: rows,
            total: countResult[0].total,
            totalPages: Math.ceil(countResult[0].total / limit),
            currentPage: page
        };
    }

    static async getDailyStats() {
        const [rows] = await pool.query(`
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as success,
                SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed
            FROM notification_logs
            WHERE DATE(created_at) = CURDATE()
        `);
        return rows[0];
    }
}

module.exports = NotificationLog;