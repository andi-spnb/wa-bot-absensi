const pool = require('../config/database');
const moment = require('moment');
const { getSocketStatus } = require('../utils/whatsapp');
const MessageTemplate = require('../models/MessageTemplate');
const BotCommand = require('../models/BotCommand');
const ApiKey = require('../models/ApiKey');

// Dashboard
exports.dashboard = async (req, res) => {
    try {
        const whatsappStatus = await getSocketStatus();
        
        // Ambil log terbaru
        const [recentLogs] = await pool.query(
            'SELECT * FROM notification_logs ORDER BY created_at DESC LIMIT 5'
        );

        // Ambil statistik
        const [stats] = await pool.query(`
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as success,
                SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed
            FROM notification_logs
        `);

        // Data untuk grafik
        const dailyData = [120, 150, 100, 200, 180, 220, 250];
        const typesData = [300, 150, 100];

        res.render('dashboard/index', {
            title: 'Dashboard',
            whatsappConnected: whatsappStatus.connected,
            recentLogs,
            stats: stats[0],
            moment,
            dailyData,
            typesData
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).render('error/index', {
            title: 'Error',
            message: error.message,
            error
        });
    }
};

// Bot Commands
exports.commands = async (req, res) => {
    try {
        const commands = await BotCommand.getAll();
        res.render('commands/index', {
            title: 'Bot Commands',
            commands,
            error: null
        });
    } catch (error) {
        console.error('Commands error:', error);
        res.render('commands/index', {
            title: 'Bot Commands',
            commands: [],
            error: 'Failed to load commands'
        });
    }
};

exports.createCommand = async (req, res) => {
    res.render('commands/form', {
        title: 'Create Command',
        command: null,
        error: null
    });
};

exports.storeCommand = async (req, res) => {
    try {
        const { command, response } = req.body;

        // Validasi input
        if (!command || !response) {
            throw new Error('Command dan response harus diisi');
        }

        // Simpan command
        await BotCommand.create({
            command: command,
            response: response
        });

        req.session.success = 'Command berhasil dibuat';
        res.redirect('/commands');
    } catch (error) {
        console.error('Store command error:', error);
        res.render('commands/form', {
            title: 'Create Command',
            command: req.body,
            error: error.message
        });
    }
};

exports.editCommand = async (req, res) => {
    try {
        const command = await BotCommand.findById(req.params.id);
        if (!command) {
            throw new Error('Command not found');
        }

        res.render('commands/form', {
            title: 'Edit Command',
            command,
            error: null
        });
    } catch (error) {
        console.error('Edit command error:', error);
        req.session.error = 'Command not found';
        res.redirect('/commands');
    }
};

exports.updateCommand = async (req, res) => {
    try {
        const { command, response } = req.body;
        await BotCommand.update(req.params.id, {
            command: command,
            response: response
        });

        req.session.success = 'Command updated successfully';
        res.redirect('/commands');
    } catch (error) {
        console.error('Update command error:', error);
        res.render('commands/form', {
            title: 'Edit Command',
            command: { ...req.body, id: req.params.id },
            error: error.message
        });
    }
};

exports.deleteCommand = async (req, res) => {
    try {
        await BotCommand.delete(req.params.id);
        res.json({
            success: true,
            message: 'Command deleted successfully'
        });
    } catch (error) {
        console.error('Delete command error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// API Keys
exports.apiKeys = async (req, res) => {
    try {
        const apiKeys = await ApiKey.getAll();
        res.render('apikeys/index', {
            title: 'API Keys',
            apiKeys,
            error: null
        });
    } catch (error) {
        console.error('API Keys error:', error);
        res.render('apikeys/index', {
            title: 'API Keys',
            error: 'Failed to load API keys',
            apiKeys: []
        });
    }
};

exports.createApiKey = (req, res) => {
    res.render('apikeys/create', {
        title: 'Create API Key',
        error: null
    });
};

exports.storeApiKey = async (req, res) => {
    try {
        const { key_name } = req.body;
        await ApiKey.generate(key_name);
        req.session.success = 'API key created successfully';
        res.redirect('/api-keys');
    } catch (error) {
        console.error('Store API key error:', error);
        res.render('apikeys/create', {
            title: 'Create API Key',
            error: error.message
        });
    }
};

exports.deactivateApiKey = async (req, res) => {
    try {
        await ApiKey.deactivate(req.params.id);
        res.json({
            success: true,
            message: 'API key deactivated successfully'
        });
    } catch (error) {
        console.error('Deactivate API key error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Message Templates
exports.templates = async (req, res) => {
    try {
        const templates = await MessageTemplate.getAll();
        res.render('templates/index', {
            title: 'Message Templates',
            templates,
            error: null
        });
    } catch (error) {
        console.error('Templates error:', error);
        res.render('templates/index', {
            title: 'Message Templates',
            templates: [],
            error: 'Failed to load templates'
        });
    }
};

exports.createTemplate = (req, res) => {
    res.render('templates/form', {
        title: 'Create Template',
        template: null,
        error: null
    });
};

exports.storeTemplate = async (req, res) => {
    try {
        await MessageTemplate.create(req.body);
        req.session.success = 'Template created successfully';
        res.redirect('/templates');
    } catch (error) {
        console.error('Store template error:', error);
        res.render('templates/form', {
            title: 'Create Template',
            template: req.body,
            error: error.message
        });
    }
};

exports.editTemplate = async (req, res) => {
    try {
        const template = await MessageTemplate.findById(req.params.id);
        res.render('templates/form', {
            title: 'Edit Template',
            template,
            error: null
        });
    } catch (error) {
        req.session.error = 'Template not found';
        res.redirect('/templates');
    }
};

exports.updateTemplate = async (req, res) => {
    try {
        await MessageTemplate.update(req.params.id, req.body);
        req.session.success = 'Template updated successfully';
        res.redirect('/templates');
    } catch (error) {
        res.render('templates/form', {
            title: 'Edit Template',
            template: { ...req.body, id: req.params.id },
            error: error.message
        });
    }
};

exports.deleteTemplate = async (req, res) => {
    try {
        await MessageTemplate.delete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Logs
exports.logs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const type = req.query.type || '';
        const status = req.query.status || '';
        const limit = 20;
        const offset = (page - 1) * limit;

        let query = 'SELECT * FROM notification_logs';
        let countQuery = 'SELECT COUNT(*) as total FROM notification_logs';
        const queryParams = [];
        const whereConditions = [];

        if (type) {
            whereConditions.push('type = ?');
            queryParams.push(type);
        }

        if (status) {
            whereConditions.push('status = ?');
            queryParams.push(status);
        }

        if (whereConditions.length > 0) {
            const whereClause = ' WHERE ' + whereConditions.join(' AND ');
            query += whereClause;
            countQuery += whereClause;
        }

        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);

        const [logs] = await pool.query(query, queryParams);
        const [count] = await pool.query(countQuery, queryParams.slice(0, -2));
        const totalPages = Math.ceil(count[0].total / limit);

        res.render('logs/index', {
            title: 'Notification Logs',
            logs,
            currentPage: page,
            totalPages,
            type,
            status,
            moment
        });
    } catch (error) {
        console.error('Logs error:', error);
        res.render('logs/index', {
            title: 'Notification Logs',
            error: 'Failed to load logs',
            logs: [],
            currentPage: 1,
            totalPages: 1,
            type: '',
            status: ''
        });
    }
};