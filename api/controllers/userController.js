import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { generateToken, deleteToken } from '../utils/generateToken.js';

const secret = process.env.JWT_SECRET || 'asdfghjkl';

// Register User
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, profileImage, password, confirmPassword } = req.body;

    // Validate
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User Already Exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            profileImage
        });

        // Use the generateToken function consistently
        generateToken(res, user.username);

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profileImage: user.profileImage
        });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(400).json({ message: 'User registration not successful', error: error.message });
    }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
        console.log('User authenticated:', user.username);
        
        generateToken(res, username); // Sets the token in a cookie
        
        // Verify cookie was set
        console.log('Response headers:', res.getHeaders());

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profileImage: user.profileImage
        });
    } else {
        res.status(400).json({ message: 'Invalid Credentials' });
    }
});

// Get User Profile
const profileUser = asyncHandler(async (req, res) => {
    console.log("Headers:", req.headers);
    console.log("Cookies:", req.cookies);

    let token = req.cookies.token;

    // Also check Authorization header
    if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        const username = decoded.username;
        const user = await User.findOne({ username });

        if (user) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(403).json({ message: 'Invalid token' });
    }
});

// Logout
const logoutUser = asyncHandler(async (req, res) => {
    try {
        deleteToken(res);
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout failed:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export { registerUser, loginUser, profileUser, logoutUser };
