import clientRepo from '../repositories/client.repo.js';

const create = async (clientData) => {
    const newClient = await clientRepo.create(clientData);
    return newClient;
};

const getAll = async (userId) => {
    const clients = await clientRepo.findAll({ userId });
    return clients;
};

const clientService = {
    create,
    getAll,
};

export default clientService;