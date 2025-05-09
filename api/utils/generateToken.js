import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET || 'default_secret'; // Use env variable

const generateToken = (res, username) => {
    const token = jwt.sign({ username }, secret, { expiresIn: '1d' });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure only in production
        sameSite: 'None',
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    });

    console.log('Token Generated:', token);
}

const deleteToken = (res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
    });

    console.log('Token Destroyed');
}

export { generateToken, deleteToken };
