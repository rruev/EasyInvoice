import { prisma } from '../lib/prisma.js';

const create = async (clientData) => {
    const client = await prisma.client.create({
        data: clientData,
    });
    return client;
};

const findAll = async (filter = {}) => {
    const clients = await prisma.client.findMany({
        where: filter,
    });
    return clients;
};

const clientRepo = {
    create,
    findAll,
};

export default clientRepo;