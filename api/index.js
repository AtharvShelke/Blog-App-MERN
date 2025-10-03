import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import dotenv from 'dotenv';
import connect from './db/connect.js';
import cookieParser from 'cookie-parser';

dotenv.config();
connect();

const port = process.env.PORT || 3000;
const app = express();

// Trust proxy (important for some environments)
app.set('trust proxy', 1);

// Middleware - ORDER MATTERS!
app.use(cookieParser()); // Parse cookies BEFORE CORS
app.use(express.json({ limit: '50mb' }));

// CORS Configuration - MUST be after cookieParser
app.use(cors({
    origin: 'https://blog-app-mern-frontend-lrsj.onrender.com', // Your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie']
}));

// Routes
app.use('/user', userRoutes);
app.use('/post', postRoutes);

// Server Listener
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
