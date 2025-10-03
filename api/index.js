import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import dotenv from 'dotenv';
import connect from './db/connect.js';
import cookieParser from 'cookie-parser';

dotenv.config();
connect();

const port = process.env.PORT || 3000; // Default value for PORT

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// CORS Configuration
app.use(cors({
    origin: 'https://blog-app-mern-frontend-lrsj.onrender.com',
    credentials: true,
}));

// Routes
app.use('/user', userRoutes);  // Mount user routes under /user instead of /
app.use('/post', postRoutes);

// Server Listener
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
