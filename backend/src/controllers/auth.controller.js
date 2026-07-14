import { Router } from 'express';
import authService from '../services/auth.service';
import clientService from '../services/client.service';
import { isAuthenticated } from '../middleware/auth.middleware';

const authController = Router();

authController.post('/register', async (req, res) => {
    const userData = req.body;

    const { user, token } = await authService.register(userData);

    res.cookie('auth-token', token, { httpOnly: true });

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

authController.get('/logout', (req, res) => {
    res.clearCookie('auth-token');
    res.json({ message: 'Logged out successfully' });
});

authController.get('/me', isAuthenticated, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Access denied. User not authenticated.' });
    }

    const user = await authService.getByEmail(req.user.email);

    res.json({
        id: user.id,
        email: user.email,
        businessName: user.businessName,
        businessAddress: user.businessAddress,
        businessEmail: user.businessEmail,
        clients: user.clients,
        invoices: user.invoices,
        nextInvoiceNum: user.nextInvoiceNum,
        phoneNumber: user.phoneNumber
    });
});

export default authController;