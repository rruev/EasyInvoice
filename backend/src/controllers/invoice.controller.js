import { Router } from 'express';
import generatePDF from '../utils/pdf.util.js';

const invoiceController = Router();

invoiceController.post('/generate', async (req, res) => {
    const { content } = req.body;

    try {
        const pdfBuffer = await generatePDF(content);
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
});

export default invoiceController;