// models/BotCommand.js
const pool = require('../config/database');

class BotCommand {
    static async getAll() {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM bot_commands ORDER BY command ASC'
            );
            return rows;
        } catch (error) {
            console.error('Error getting commands:', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM bot_commands WHERE id = ?',
                [id]
            );
            return rows[0];
        } catch (error) {
            console.error('Error finding command by id:', error);
            throw error;
        }
    }

    static async findByCommand(command) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM bot_commands WHERE command = ? AND is_active = true',
                [command]
            );
            return rows[0];
        } catch (error) {
            console.error('Error finding command:', error);
            throw error;
        }
    }

    static async create(data) {
        try {
            let { command, response } = data;
            
            // Tambahkan prefix ! jika belum ada
            if (!command.startsWith('!')) {
                command = '!' + command;
            }

            // Cek apakah command sudah ada
            const [existing] = await pool.query(
                'SELECT id FROM bot_commands WHERE command = ?',
                [command]
            );

            if (existing.length > 0) {
                throw new Error('Command sudah ada, gunakan command lain');
            }

            const [result] = await pool.query(
                'INSERT INTO bot_commands (command, response) VALUES (?, ?)',
                [command, response]
            );

            return result.insertId;
        } catch (error) {
            console.error('Error creating command:', error);
            throw error;
        }
    }

    static async update(id, data) {
        try {
            let { command, response } = data;
            
            // Tambahkan prefix ! jika belum ada
            if (!command.startsWith('!')) {
                command = '!' + command;
            }

            // Cek apakah command sudah ada (kecuali untuk command yang sedang diupdate)
            const [existing] = await pool.query(
                'SELECT id FROM bot_commands WHERE command = ? AND id != ?',
                [command, id]
            );

            if (existing.length > 0) {
                throw new Error('Command sudah ada, gunakan command lain');
            }

            const [result] = await pool.query(
                'UPDATE bot_commands SET command = ?, response = ? WHERE id = ?',
                [command, response, id]
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating command:', error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const [result] = await pool.query(
                'DELETE FROM bot_commands WHERE id = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error deleting command:', error);
            throw error;
        }
    }

    // Method untuk mengaktifkan/nonaktifkan command
    static async toggleActive(id, isActive) {
        try {
            const [result] = await pool.query(
                'UPDATE bot_commands SET is_active = ? WHERE id = ?',
                [isActive, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error toggling command status:', error);
            throw error;
        }
    }
}

module.exports = BotCommand;