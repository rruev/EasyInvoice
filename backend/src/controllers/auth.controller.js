import { Router } from 'express';
import authService from '../services/auth.service.js';
import clientService from '../services/client.service.js';
import { isAuthenticated } from '../middleware/auth.middleware';
import { userLogInSchema, userRegisterSchema } from '../schemas/user.schema';
import { getErrors } from '../utils/error.util.js';

const authController = Router();

authController.post('/register', async (req, res) => {
    try {
        const userData = userRegisterSchema.parse(req.body);

        const { user, token } = await authService.register(userData);

        res.cookie('auth-token', token, { httpOnly: true });

        res.json({
            id: user.id,
            email: user.email,
            token
        });
    } catch (error) {
        const errors = getErrors(error);

        res.status(400).json({ 
            message: 'registration failed',
            errors: errors
        });
    }
});

authController.post('/login', async (req, res) => {
    try {
        const userData = userLogInSchema.parse(req.body);

        const { user, token } = await authService.login(userData);
        
        res.cookie('auth-token', token, { httpOnly: true});
    
        res.json({
            id: user.id,
            email: user.email,
            token
        });
    } catch (error) {
        const errors = getErrors(error);

        res.status(400).json({ 
            message: 'login failed',
            errors: errors
        });
    }

});

authController.get('/logout', (req, res) => {
    res.clearCookie('auth-token');
    res.json({ message: 'Logged out successfully' });
});

authController.get('/me', isAuthenticated, async (req, res) => {
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