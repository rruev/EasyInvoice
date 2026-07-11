import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

const tokenUtil = {
    generateToken,
    verifyToken
};

export default tokenUtil;