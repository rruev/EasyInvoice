import { Router } from 'express';
import authController from './controllers/auth.controller.js';
import invoiceController from './controllers/invoice.controller.js';
import clientController from './controllers/client.controller.js';
import userController from './controllers/user.controller.js';

const router = Router();

router.use('/auth', authController);
router.use('/users', userController);
router.use('/invoices', invoiceController);
router.use('/clients', clientController);

export default router;