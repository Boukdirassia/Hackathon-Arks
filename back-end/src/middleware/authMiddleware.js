/**
 * Simplified Auth Middleware for MoBoe - No Database Required
 * Perfect for jury presentations!
 */

import jwt from 'jsonwebtoken';

// Simple JWT secret for demo purposes
const JWT_SECRET = process.env.JWT_SECRET || 'moboe-demo-secret-key';

/**
 * Protect middleware - validates JWT tokens
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, JWT_SECRET);

            // For demo purposes, just attach the decoded user info
            // In a real app, you would fetch the user from database
            req.user = {
                id: decoded.id,
                // Add any other user info you need
            };

            console.log(`🔐 Token verified for user: ${decoded.id}`);
            next();
        } catch (error) {
            console.error('❌ Token verification failed:', error.message);
            res.status(401).json({ 
                message: 'Not authorized, token failed',
                success: false 
            });
        }
    } else {
        console.error('❌ No token provided');
        res.status(401).json({ 
            message: 'Not authorized, no token provided',
            success: false 
        });
    }
};

export { protect };
