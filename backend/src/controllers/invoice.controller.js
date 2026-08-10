import { Router } from 'express';
import invoiceService from '../services/invoice.service.js';
import { getErrors } from '../utils/error.util.js';
import { invoiceSchema } from '../schemas/invoice.schema.js';
import { isAuthenticated } from "../middleware/auth.middleware.js";

const invoiceController = Router();

invoiceController.post('/generate', async (req, res) => {
    const user = req.user;

    if (!user) {
        const pdfBuffer = await invoiceService.generate(req.body);

        res.setHeader('Content-Type', 'application/pdf').send(pdfBuffer);
    }

    try {
        const invoiceData = invoiceSchema.parse(req.body);
        
        const pdfBuffer = await invoiceService.generate({ ...invoiceData, userId: user.id });

        res.setHeader('Content-Type', 'application/pdf').send(pdfBuffer);
    } catch (error) {
        const errors = getErrors(error);
        res.status(400).json({ errors });
    }
});

invoiceController.get('/', isAuthenticated, async (req, res) => {
    const userId = req.user.id;

    try {
        const invoices = await invoiceService.findAll(userId);

        res.status(200).json(invoices);
    } catch (error) {
        const errors = getErrors(error);
        res.status(500).json({ message: 'Failed to fetch invoices', errors: errors });
    }
});

invoiceController.put('/:invoiceId', isAuthenticated, async (req, res) => {
    const invoiceId = req.params.invoiceId;
    const updatedData = req.body;

    try {
        const updatedInvoice = await invoiceService.update(invoiceId, updatedData);

        res.status(200).json(updatedInvoice);
    } catch (error) {
        const errors = getErrors(error);
        res.status(500).json({ message: 'Failed to update invoice', errors: errors });
    }
});

invoiceController.delete('/:invoiceId', isAuthenticated, async (req, res) => {
    const invoiceId = req.params.invoiceId;

    try {
        await invoiceService.remove(invoiceId);

        res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        const errors = getErrors(error);
        res.status(500).json({ message: 'Failed to delete invoice', errors: errors });
    }
});

invoiceController.get('/stats', isAuthenticated, async (req, res) => {
    const userId = req.user.id;

    try {
        const stats = await invoiceService.getStats(userId);

        res.status(200).json(stats);
    } catch (error) {
        const errors = getErrors(error);
        res.status(500).json({ message: 'Failed to fetch invoice statistics', errors: errors });
    }
});

export default invoiceController;