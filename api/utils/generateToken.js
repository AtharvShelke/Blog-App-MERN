import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET || 'default_secret';

const generateToken = (res, username) => {
    const token = jwt.sign({ username }, secret, { expiresIn: '1d' });

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,      // false for localhost http
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        path: '/'           // IMPORTANT: Add this
    });

    console.log('Token Generated:', token);
    return token; // Return token for verification
}

const deleteToken = (res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/'           // IMPORTANT: Must match the set cookie path
    });

    console.log('Token Destroyed');
}

export { generateToken, deleteToken };
