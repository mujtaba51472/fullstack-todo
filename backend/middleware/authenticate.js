import BlacklistedToken from '../models/BlacklistedToken.js';
import jwt from 'jsonwebtoken';


export const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // First check if token is blacklisted
        const blacklisted = await BlacklistedToken.findOne({ token });
        if (blacklisted) {
            return res.status(401).json({ message: 'Token has been revoked' });
        }

        //  verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token  expired' });
        }
        return res.status(401).json({ message: 'Invalid token , User is not authenticated' });
    }
};