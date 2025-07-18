/**
 * Simplified Auth Controller for MoBoe - No Database Required
 * Perfect for jury presentations - accepts any credentials!
 */

import jwt from "jsonwebtoken";

// Simple JWT secret for demo purposes
const JWT_SECRET = process.env.JWT_SECRET || 'moboe-demo-secret-key';

// Mock user storage (in-memory for demo)
const mockUsers = new Map();

/**
 * Generate JWT token for user
 * @param {string} userId - User ID
 * @returns {string} JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

/**
 * Register a new user (mock implementation)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Input validation
    if (!username || !email || !password) {
      return res.status(400).json({ 
        message: "Please provide username, email, and password",
        success: false 
      });
    }

    // Check if user already exists in mock storage
    if (mockUsers.has(email)) {
      return res.status(400).json({ 
        message: "User already exists with this email",
        success: false 
      });
    }

    // Create mock user
    const userId = Date.now().toString(); // Simple ID generation
    const user = {
      id: userId,
      username,
      email,
      password, // In real app, this would be hashed
      createdAt: new Date().toISOString()
    };

    // Store in mock database
    mockUsers.set(email, user);

    // Generate token
    const token = generateToken(userId);

    console.log(`🆕 New user registered: ${username} (${email})`);

    res.status(201).json({
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email 
      },
      token,
      success: true,
      message: "Registration successful!"
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ 
      message: "Server error during registration", 
      success: false,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Login user (accepts any credentials for demo)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: "Please provide email and password",
        success: false 
      });
    }

    // For demo purposes, accept any credentials!
    // Check if user exists in mock storage first
    let user = mockUsers.get(email);
    
    if (!user) {
      // Create a demo user on the fly
      const userId = Date.now().toString();
      user = {
        id: userId,
        username: email.split('@')[0], // Use email prefix as username
        email,
        password,
        createdAt: new Date().toISOString()
      };
      mockUsers.set(email, user);
      console.log(`🎭 Demo user created: ${user.username} (${email})`);
    }

    // Generate token
    const token = generateToken(user.id);

    console.log(`🔐 User logged in: ${user.username} (${email})`);

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
      success: true,
      message: "Login successful!"
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ 
      message: "Server error during login", 
      success: false,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find user in mock storage
    let user = null;
    for (const [email, userData] of mockUsers.entries()) {
      if (userData.id === userId) {
        user = userData;
        break;
      }
    }

    if (!user) {
      return res.status(404).json({ 
        message: "User not found",
        success: false 
      });
    }

    res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      success: true
    });
  } catch (error) {
    console.error('❌ Profile error:', error);
    res.status(500).json({ 
      message: "Server error fetching profile", 
      success: false,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
