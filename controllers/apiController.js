const { sendWhatsAppMessage, getSocketStatus } = require('../utils/whatsapp');
const templates = require('../utils/templates');
const pool = require('../config/database');

exports.sendNotification = async (req, res) => {
    const { type, phone, data } = req.body;

    try {
        const [templates] = await pool.query(
            'SELECT * FROM message_templates WHERE type = ?',
            [type]
        );
        
        if (templates.length === 0) {
            throw new Error('Template tidak ditemukan');
        }

        const template = templates[0];
        const message = MessageTemplate.parseTemplate(template.content, data);

        await sendWhatsAppMessage(phone, message);

        await pool.query(
            'INSERT INTO notification_logs (type, phone, message, status) VALUES (?, ?, ?, ?)',
            [type, phone, message, 'success']
        );

        res.json({
            success: true,
            message: 'Notifikasi berhasil dikirim'
        });

    } catch (error) {
        logger.error('Error sending notification:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.status = async (req, res) => {
    try {
        const status = getSocketStatus();
        res.json({
            success: true,
            connected: status.connected,
            timestamp: new Date()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.testNotification = async (req, res) => {
    const { phone } = req.body;

    try {
        if (!phone) {
            return res.status(400).json({
                success: false,
                message: 'Nomor telepon diperlukan'
            });
        }

        const message = "🔔 Ini adalah pesan test notifikasi dari WA Bot Absensi";
        await sendWhatsAppMessage(phone, message);

        await pool.query(
            'INSERT INTO notification_logs (type, phone, message, status) VALUES (?, ?, ?, ?)',
            ['test', phone, message, 'success']
        );

        res.json({
            success: true,
            message: 'Test notifikasi berhasil dikirim'
        });

    } catch (error) {
        console.error('Error sending test notification:', error);
        
        await pool.query(
            'INSERT INTO notification_logs (type, phone, message, status, error) VALUES (?, ?, ?, ?, ?)',
            ['test', phone, message, 'failed', error.message]
        );

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};