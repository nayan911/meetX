const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide activity title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide activity description']
  },
  location: {
    type: String,
    required: [true, 'Please provide activity location']
  },
  dateTime: {
    type: Date,
    required: [true, 'Please provide date and time']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Activity', ActivitySchema); 