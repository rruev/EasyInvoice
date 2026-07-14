import { Router } from 'express';
import authController from './controllers/auth.controller.js';
import invoiceController from './controllers/invoice.controller.js';
import clientController from './controllers/client.controller.js';

const router = Router();

router.use('/auth', authController);
router.use('/invoice', invoiceController);
router.use('/client', clientController);

export default router;