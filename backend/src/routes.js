import { Router } from 'express';
import authController from './controllers/auth.controller.js';
import invoiceController from './controllers/invoice.controller.js';

const router = Router();

router.use('/auth', authController);
router.use('/invoice', invoiceController);

export default router;