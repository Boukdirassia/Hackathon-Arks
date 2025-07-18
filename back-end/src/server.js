/**
 * MoBoe Backend Server - Simplified for Jury Presentation
 * No external dependencies - perfect for demos!
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from './routes/chatRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

console.log('🎬 Starting MoBoe Backend Server...');

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004', 'http://localhost:3005'],
    credentials: true
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`📡 ${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', chatRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        message: 'MoBoe Backend is running!',
        timestamp: new Date().toISOString()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: '🎬 Welcome to MoBoe Backend API!',
        version: '1.0.0',
        endpoints: {
            auth: {
                login: '/api/auth/login',
                register: '/api/auth/register',
                profile: '/api/auth/profile'
            },
            chat: '/api/chat',
            health: '/health'
        },
        demo: {
            note: 'This is a demo version - accepts any login credentials!',
            testCredentials: {
                email: 'any@email.com',
                password: 'any-password'
            }
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Server Error:', err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        message: 'Endpoint not found',
        availableEndpoints: {
            auth: {
                login: '/api/auth/login',
                register: '/api/auth/register',
                profile: '/api/auth/profile'
            },
            chat: '/api/chat',
            health: '/health',
            root: '/'
        }
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 MoBoe Backend Server is running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
    console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat`);
    console.log('✅ Server ready for jury presentation!');
});
