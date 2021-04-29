const express = require('express');
const router = express.Router();

// Controllers
const siteController = require('../controllers/site.controller');

// Landing page
router.get('/', siteController.index);
router.post('/send-message', siteController.sendMessage);

module.exports = router;