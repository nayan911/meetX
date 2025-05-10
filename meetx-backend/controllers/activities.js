const { validationResult } = require('express-validator');
const Activity = require('../models/Activity');

// @desc    Get all activities
// @route   GET /api/activities
// @access  Public
exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ dateTime: 1 });

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get single activity
// @route   GET /api/activities/:id
// @access  Public
exports.getActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    res.status(200).json({
      success: true,
      data: activity
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Create new activity
// @route   POST /api/activities
// @access  Private (Admin only in a real app)
exports.createActivity = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  try {
    const activity = await Activity.create(req.body);

    res.status(201).json({
      success: true,
      data: activity
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'May be the activity Id is wrong'
    });
  }
}; 