const { validationResult } = require('express-validator');
const User = require('../models/User');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  console.log('Register endpoint hit');
  console.log('Request body:', req.body);
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  const { name, email, phone, password } = req.body;
  console.log('Extracted user data:', { name, email, phone, passwordLength: password ? password.length : 0 });

  try {
    console.log('Checking if user exists with email:', email);
    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log('User already exists');
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user
    console.log('Creating new user');
    const user = await User.create({
      name,
      email,
      phone,
      password
    });

    console.log('User created successfully with ID:', user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully'
    });
  } catch (err) {
    console.error('Error in register function:', err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  console.log('Login endpoint hit');
  console.log('Request body:', req.body);
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  const { email, password } = req.body;

  try {
    console.log('Checking if user exists with email:', email);
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log('User not found');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    console.log('Checking password');
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log('Login successful for user ID:', user._id);

    const token = user.getSignedJwtToken();
    console.log('JWT token generated');

    res.status(200).json({
      success: true,
      token
    });
  } catch (err) {
    console.error('Error in login function:', err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log('User profile fetched with ID:', user._id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error('Error in getMe function:', err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
}; 