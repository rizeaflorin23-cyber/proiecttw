const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/activities - Doar profesorii autentificați pot accesa asta
router.post('/', authMiddleware, activityController.createActivity);

module.exports = router;