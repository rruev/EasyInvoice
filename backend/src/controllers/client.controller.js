import { Router } from 'express';
import clientService from '../services/client.service.js';
import clientSchema from '../schemas/client.schema.js';

const clientController = Router();

clientController.get('/', async (req, res) => {
    const clients = await clientService.getAll(req.user?.id);

    res.status(200).json(clients);
});

clientController.post('/', async (req, res) => {
    const clientData = { ...req.body, userId: req.user?.id };

    const newClient = await clientService.create(clientData);

    res.status(201).json(newClient);
});


export default clientController;