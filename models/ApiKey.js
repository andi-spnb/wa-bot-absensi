const pool = require('../config/database');
const crypto = require('crypto');

class ApiKey {
    static async generate(keyName) {
        const apiKey = crypto.randomBytes(32).toString('hex');
        
        const [result] = await pool.query(
            'INSERT INTO api_keys (key_name, api_key) VALUES (?, ?)',
            [keyName, apiKey]
        );

        return { id: result.insertId, keyName, apiKey };
    }

    static async findByKey(apiKey) {
        const [rows] = await pool.query(
            'SELECT * FROM api_keys WHERE api_key = ? AND is_active = true',
            [apiKey]
        );
        return rows[0];
    }

    static async getAll() {
        const [rows] = await pool.query(
            'SELECT * FROM api_keys ORDER BY created_at DESC'
        );
        return rows;
    }

    static async deactivate(id) {
        await pool.query(
            'UPDATE api_keys SET is_active = false WHERE id = ?',
            [id]
        );
    }

    static async updateLastUsed(id) {
        await pool.query(
            'UPDATE api_keys SET last_used = NOW() WHERE id = ?',
            [id]
        );
    }
}

module.exports = ApiKey;