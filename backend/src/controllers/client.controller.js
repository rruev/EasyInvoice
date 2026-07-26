import { Router } from 'express';
import clientService from '../services/client.service.js';
import clientSchema from '../schemas/client.schema.js';
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { getErrors } from "../utils/error.util.js";

const clientController = Router();

clientController.get('/', isAuthenticated, async (req, res) => {
    const filter = req.query;
    console.log(filter);
    try {
        const clients = await clientService.getAll({ userId: req.user?.id, ...filter });

        res.status(200).json(clients);
    } catch (error) {
        const errors = getErrors(error);
        res.status(400).json({
            message: 'Failed to fetch clients',
            errors: errors
        });
    }
});

clientController.get('/:id', isAuthenticated, async (req, res) => {
    const clientId = req.params.id;
    const client = await clientService.getById(clientId); // test if you can get another user's client by id

    if (!client) {
        return res.status(404).json({
            message: 'Client not found',
            errors: { general: ['Client not found'] }
        });
    }

    res.status(200).json(client);
});

clientController.post('/', isAuthenticated, async (req, res) => {
    try {
        const clientData = clientSchema.parse(req.body);

        const newClient = await clientService.create({ ...clientData, userId: req.user?.id });

        res.status(201).json(newClient);
    } catch (error) {
        const errors = getErrors(error);
        res.status(400).json({
            message: 'Failed to create client',
            errors: errors
        });
    }
});

clientController.put('/:id', isAuthenticated, async (req, res) => {
    const clientId = req.params.id;

    try {
        const clientData = clientSchema.parse(req.body);

        const updatedClient = await clientService.update(clientId, clientData);

        res.status(200).json(updatedClient);
    } catch (error) {
        const errors = getErrors(error);
        res.status(400).json({
            message: 'Failed to update client',
            errors: errors
        });
    }
});

clientController.delete('/:id', isAuthenticated, async (req, res) => {
    const clientId = req.params.id;

    try {
        await clientService.remove(clientId);

        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        const errors = getErrors(error);
        res.status(400).json({
            message: 'Failed to delete client',
            errors: errors
        });
    }

});


export default clientController;