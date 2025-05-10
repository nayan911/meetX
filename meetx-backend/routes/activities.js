const express = require('express');
const { check } = require('express-validator');
const { getActivities, getActivity, createActivity } = require('../controllers/activities');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getActivities);

router.get('/:id', getActivity);

router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
    check('dateTime', 'Date and time is required').not().isEmpty()
  ],
  protect,
  createActivity
);

module.exports = router; 