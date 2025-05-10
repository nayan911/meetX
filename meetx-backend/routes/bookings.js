const express = require('express');
const { check } = require('express-validator');
const { bookActivity, getMyBookings } = require('../controllers/bookings');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post(
  '/',
  [
    check('activityId', 'Activity ID is required').not().isEmpty()
  ],
  bookActivity
);

router.get('/me', getMyBookings);

module.exports = router; 