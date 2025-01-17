// models/CommandHandler.js
const { getSocketStatus } = require('../utils/whatsapp');
const BotCommand = require('./BotCommand');
const pool = require('../config/database');

class CommandHandler {
    // Helper untuk format pesan
    static formatMessage(title, content) {
        return `*${title}*\n\n${content}`;
    }

    // Handler utama untuk semua command
    static async handleCommand(command) {
        try {
            // Cek command di database
            const commandData = await BotCommand.findByCommand(command);
            
            if (commandData) {
                return commandData.response;
            }

            // Handle special commands yang tidak ada di database
            switch (command.toLowerCase()) {
                case '!ping':
                    return await this.handlePing();
                case '!status':
                    return await this.handleStatus();
                default:
                    return this.formatMessage('❌ Error',
                        'Perintah tidak dikenal. Ketik !help untuk melihat daftar perintah.'
                    );
            }
        } catch (error) {
            console.error('Error handling command:', error);
            return this.formatMessage('❌ Error',
                'Terjadi kesalahan saat memproses perintah.'
            );
        }
    }

    // Handler khusus untuk command !status
    static async handleStatus() {
        const status = getSocketStatus();
        return this.formatMessage('🔌 Status Koneksi',
            `Status: ${status.connected ? '🟢 Terhubung' : '🔴 Terputus'}
Waktu cek: ${new Date().toLocaleString()}`
        );
    }

    // Handler khusus untuk command !ping
    static async handlePing() {
        const startTime = Date.now();
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        return this.formatMessage('🏓 Pong!',
            `Waktu respons: ${responseTime}ms
Status: Aktif`
        );
    }

    // Method untuk log command
    static async logCommand(command, sender) {
        try {
            await pool.query(
                'INSERT INTO command_logs (command, sender, created_at) VALUES (?, ?, NOW())',
                [command, sender]
            );
        } catch (error) {
            console.error('Error logging command:', error);
        }
    }
}

module.exports = CommandHandler;