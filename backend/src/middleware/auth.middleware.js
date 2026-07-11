import tokenUtil from '../utils/token.util.js';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth-token'];

    if (!token) {
        return next();
    }

    try {
        const decoded = tokenUtil.verifyToken(token);
        req.user = decoded;
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' });
    }

    next();
};

export const isAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Access denied. User not authenticated.' });
    }
    next();
};