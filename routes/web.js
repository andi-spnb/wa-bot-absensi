const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const webController = require('../controllers/webController');
const webAuth = require('../middlewares/webAuth');
// Auth routes
router.get('/login', authController.loginPage);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Protected routes
router.use(webAuth);

// Dashboard
router.get('/', webController.dashboard);

// API Keys management
router.get('/api-keys', webController.apiKeys);
router.get('/api-keys/create', webController.createApiKey);
router.post('/api-keys/create', webController.storeApiKey);
router.post('/api-keys/:id/deactivate', webController.deactivateApiKey);
router.get('/templates', webController.templates);
router.get('/templates/create', webController.createTemplate);
router.post('/templates', webController.storeTemplate);
router.get('/templates/:id/edit', webController.editTemplate);
router.post('/templates/:id', webController.updateTemplate);
router.delete('/templates/:id', webController.deleteTemplate);
//commands 
// Bot Commands
router.get('/commands', webAuth, webController.commands);
router.get('/commands/create', webAuth, webController.createCommand);
router.post('/commands', webAuth, webController.storeCommand);
router.get('/commands/:id/edit', webAuth, webController.editCommand);
router.post('/commands/:id', webAuth, webController.updateCommand);
router.delete('/commands/:id', webAuth, webController.deleteCommand);
// Logs
router.get('/logs', webController.logs);

module.exports = router;
