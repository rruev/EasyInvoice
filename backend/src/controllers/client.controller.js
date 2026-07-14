import { Router } from 'express';
import clientService from '../services/client.service.js';

const clientController = Router();

clientController.post('/create', async (req, res) => {
    const clientData = { ...req.body, userId: req.user?.id };

    const newClient = await clientService.create(clientData);

    res.status(201).json(newClient);
});

clientController.get('/', async (req, res) => {
    const clients = await clientService.getAll(req.user?.id);

    res.status(200).json(clients);
});

export default clientController;