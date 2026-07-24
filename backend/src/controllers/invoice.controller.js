import { Router } from 'express';
import invoiceService from '../services/invoice.service.js';
import { getErrors } from '../utils/error.util.js';
import { invoiceSchema } from '../schemas/invoice.schema.js';

const invoiceController = Router();

invoiceController.post('/generate', async (req, res) => {
    try {
        const data = invoiceSchema.parse(req.body);
        const invoiceData = { ...req.body, userId: req.user?.id }; //TODO: fix this

        const pdfBuffer = await invoiceService.generate(invoiceData);
    
        res.setHeader('Content-Type', 'application/pdf').send(pdfBuffer);
    } catch (error) {
        const errors = getErrors(error);
        res.status(400).json({ errors });
    }
});

invoiceController.put('/update/:invoiceId', async (req, res) => {
    const invoiceId = req.params.invoiceId;
    const updatedData = req.body;

    try {
        const updatedInvoice = await invoiceService.update(invoiceId, updatedData);
        res.status(200).json(updatedInvoice);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update invoice' });
    }
});

invoiceController.delete('/delete/:invoiceId', async (req, res) => {
    const invoiceId = req.params.invoiceId;

    try {
        await invoiceService.remove(invoiceId);
        res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete invoice' });
    }
});

export default invoiceController;