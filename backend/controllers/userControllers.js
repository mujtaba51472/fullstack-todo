import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModels.js';
import BlacklistedToken from '../models/BlacklistedToken.js';

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = new User({
            username,
            email,
            password, 
        });
        console.log("Login User ID:", user._id);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        await user.save();
        res.status(201).json({ message: 'User registered successfully', data: {
            username: user.username,
            email: user.email,
        } });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // expire in 7 days
        const expiresIn = 7 * 24 * 60 * 60;

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET , {
            expiresIn: expiresIn,
        });
        res.status(200).json({ message: 'Login successful', data: {
            username: user.username,
            email: user.email,
            token,
        } });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}


export const logoutUser = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];


  try {
    const decoded = jwt.decode(token);
    const expiresAt = new Date(decoded.exp * 1000);

    // Add to blacklist
    await BlacklistedToken.create({ token, expiresAt });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed', error });
  }
};


export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude password field
        res.status(200).json({ message: 'Users retrieved successfully', data: users });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}