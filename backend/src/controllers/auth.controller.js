import { Router } from 'express';
import authService from '../services/auth.service';
import clientService from '../services/client.service';
import { isAuthenticated } from '../middleware/auth.middleware';

const authController = Router();

authController.post('/register', async (req, res) => {
    const userData = req.body;

    const { user, token } = await authService.register({ email: userData.email, password: userData.password, confirmPassword: userData.confirmPassword });
    if (user) {
        const clientData = {
            name: userData.name,
            address: userData.street + ' ' + userData.streetNumber + ', ' + userData.postcode + ' ' + userData.city,
            phone: userData.phone,
            userId: user.id
        };
        await clientService.create(clientData);
    }
    res.cookie('auth-token', token, { httpOnly: true, sameSite: 'none', secure: false });

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
        companyEmail: user.companyEmail,
    });
});

export default authController;