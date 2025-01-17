const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const logger = require('./utils/logger');
const { startWhatsApp } = require('./utils/whatsapp');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Tambahkan ini di bagian session setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'rahasia123',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,  // ubah ke false dulu
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Di app.js atau index.js
app.use((req, res, next) => {
    console.log('Request:', {
        method: req.method,
        path: req.path,
        body: req.body
    });
    next();
});
// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Routes
app.use('/', require('./routes/web'));
app.use('/api', require('./routes/api'));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Start server and WhatsApp connection
const server = app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await startWhatsApp();
        console.log('WhatsApp client initialized');
    } catch (error) {
        console.error('Failed to initialize WhatsApp:', error);
    }
});

// Handle errors
server.on('error', (error) => {
    console.error('Server error:', error);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
});
