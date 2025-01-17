const express = require('express');
const router = express.Router();

// Import routes
const apiRoutes = require('./api');
const webRoutes = require('./web');

// Apply routes
router.use('/api', apiRoutes);
router.use('/', webRoutes);

// 404 handler
router.use((req, res) => {
    if (req.xhr || req.path.startsWith('/api')) {
        return res.status(404).json({
            success: false,
            message: 'Route not found'
        });
    }
    res.status(404).render('errors/404');
});

module.exports = router;