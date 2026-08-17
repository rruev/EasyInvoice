import { prisma } from '../lib/prisma.js';

const findAll = async (userId) => {
    const clients = await prisma.client.findMany({
        where: { userId },
        include: {
            invoices: {
                select: {
                    id: true,
                }
            }
        }
    });
    return clients;
};

const findById = async (clientId) => {
    const client = await prisma.client.findUnique({
        where: { id: clientId },
        include: {
            invoices: {
                select: {
                    id: true,
                }
            }
        }
    });
    return client;
};

const create = async (clientData) => {
    const client = await prisma.client.create({
        data: clientData,
    });
    return client;
};

const update = async (clientId, clientData) => {
    const updatedClient = await prisma.client.update({
        where: { id: clientId },
        data: clientData,
    });
    return updatedClient;
};

const remove = async (clientId) => {
    await prisma.client.delete({
        where: { id: clientId },
    });
};



const clientRepo = {
    findAll,
    findById,
    create,
    update,
    remove,
};

export default clientRepo;