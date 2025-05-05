const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../db');

/**
 * @route   POST /api/add-user
 * @desc    Add a new user (requires authentication)
 * @access  Private
 */
router.post('/add-user', auth, async (req, res) => {
  try {
    // Get user data from request
    const { name, email, role } = req.body;

    // Validation
    if (!name || !email || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user already exists
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Generate a random password for the new user
    const password = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    
    // Hash the password
    const bcrypt = require('bcrypt');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into database
    const result = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashedPassword, role]
    );

    // In a real application, you might want to send an email to the user with their initial password

    // Return success response
    res.status(201).json({
      message: 'User added successfully',
      user: {
        ...result.rows[0],
        // Don't send the temporary password in production
        // This is just for demonstration purposes
        temporaryPassword: password 
      }
    });
  } catch (error) {
    console.error('Add user error:', error);
    res.status(500).json({ message: 'Server error while adding user' });
  }
});

/**
 * @route   GET /api/users
 * @desc    Get all users (requires authentication)
 * @access  Private
 */
router.get('/users', auth, async (req, res) => {
  try {
    // Get all users from database (excluding passwords)
    const result = await db.query(
      'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC'
    );

    res.json({
      users: result.rows
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
});

/**
 * @route   GET /api/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', auth, async (req, res) => {
  try {
    // Get user info from database
    const result = await db.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
});

module.exports = router; 