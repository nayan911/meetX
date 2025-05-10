const { validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Activity = require('../models/Activity');

// @desc    Book an activity
// @route   POST /api/bookings
// @access  Private
exports.bookActivity = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  const { activityId } = req.body;

  try {
    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    const existingBooking = await Booking.findOne({
      user: req.user.id,
      activity: activityId
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'You have already booked this activity'
      });
    }

    const booking = await Booking.create({
      activity: activityId,
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/me
// @access  Private
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate({
        path: 'activity',
        select: 'title description location dateTime'
      });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
}; 