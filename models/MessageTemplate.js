// models/MessageTemplate.js
const pool = require('../config/database');

class MessageTemplate {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM message_templates ORDER BY name');
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.query(
            'SELECT * FROM message_templates WHERE id = ?', 
            [id]
        );
        return rows[0];
    }

    static async create(data) {
        try {
            const { name, content, type } = data;
            
            // Validasi input
            if (!name || !content || !type) {
                throw new Error('Semua field harus diisi');
            }

            const [result] = await pool.query(
                'INSERT INTO message_templates (name, content, type) VALUES (?, ?, ?)',
                [name, content, type]
            );
            
            return result.insertId;
        } catch (error) {
            console.error('Error creating template:', error);
            throw error;
        }
    }

    static async update(id, data) {
        const { name, content, type } = data;
        await pool.query(
            'UPDATE message_templates SET name = ?, content = ?, type = ? WHERE id = ?',
            [name, content, type, id]
        );
    }

    static async delete(id) {
        await pool.query('DELETE FROM message_templates WHERE id = ?', [id]);
    }

    // Method untuk parsing template
    static parseTemplate(content, data) {
        let parsedContent = content;
        for (const [key, value] of Object.entries(data)) {
            parsedContent = parsedContent.replace(
                new RegExp(`{{\\s*${key}\\s*}}`, 'g'), 
                value
            );
        }
        return parsedContent;
    }
}

module.exports = MessageTemplate;