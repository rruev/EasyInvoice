import { Router } from 'express';
import authService from '../services/auth.service';

const authController = Router();

authController.post('/register', async (req, res) => {
    const userData = req.body;

    const user = await authService.register(userData);
    res.json(user);
});

authController.post('/login', async (req, res) => {
    const userData = req.body;

    const user = await authService.login(userData);
    res.json(user);
});

export default authController;