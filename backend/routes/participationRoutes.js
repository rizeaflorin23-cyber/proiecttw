const express = require('express');
const router = express.Router();
const participationController = require('../controllers/participationController');

// Rută publică: Oricine are codul poate intra
router.post('/join', participationController.joinActivity);

module.exports = router;