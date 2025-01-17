const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const apiAuth = require('../middlewares/apiAuth');

// Status endpoint (tanpa auth)
router.get('/status', apiController.status);

// Routes yang memerlukan auth
router.use(apiAuth);
router.post('/send', apiController.sendNotification);
router.post('/test', apiController.testNotification);

module.exports = router;
