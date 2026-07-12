import { Router } from 'express';
import invoiceService from '../services/invoice.service.js';

const invoiceController = Router();

invoiceController.post('/generate', async (req, res) => {
    const { content } = req.body;

    const pdfBuffer = await invoiceService.generate(content);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
});

export default invoiceController;