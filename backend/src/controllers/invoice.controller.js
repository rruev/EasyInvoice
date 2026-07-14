import { Router } from 'express';
import invoiceService from '../services/invoice.service.js';

const invoiceController = Router();

invoiceController.post('/generate', async (req, res) => {
    const invoiceData = { ...req.body, userId: req.user.id };

    const pdfBuffer = await invoiceService.generate(invoiceData);

    res.setHeader('Content-Type', 'application/pdf').send(pdfBuffer);
});

export default invoiceController;