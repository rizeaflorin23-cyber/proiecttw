const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/feedback - Doar cei cu token (studenții) pot accesa
router.post('/', authMiddleware, feedbackController.sendFeedback);

module.exports = router;