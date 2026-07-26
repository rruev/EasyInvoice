import clientRepo from '../repositories/client.repo.js';

const getAll = async (filter = {}) => {
    const clients = await clientRepo.findAll(filter);
    return clients;
};

const getById = async (clientId) => {
    const client = await clientRepo.findById(clientId);
    
    return client;
};

const create = async (clientData) => {
    const newClient = await clientRepo.create(clientData);
    return newClient;
};

const update = async (clientId, clientData) => {
    const updatedClient = await clientRepo.update(clientId, clientData);
    return updatedClient;
};

const remove = async (clientId) => {
    await clientRepo.remove(clientId);
};


const clientService = {
    getAll,
    create,
    getById,
    update,
    remove,
};

export default clientService;