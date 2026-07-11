import { Router } from 'express';
import authService from '../services/auth.service';

const authController = Router();

authController.post('/register', async (req, res) => {
    const userData = req.body;

    const { user, token } = await authService.register(userData);
    res.cookie('auth-token', token, { httpOnly: true});

    res.json({
        id: user.id,
        email: user.email,
        token
    });
});

authController.post('/login', async (req, res) => {
    const userData = req.body;

    const { user, token } = await authService.login(userData);
    res.cookie('auth-token', token, { httpOnly: true});

    res.json({
        id: user.id,
        email: user.email,
        token
    });
});

export default authController;