import { prisma } from "../lib/prisma.js";

const create = async (invoiceData) => {
    const invoice = await prisma.invoice.create({
        data: invoiceData,
    });
    return invoice;
};

const findById = async (id) => {
    const invoice = await prisma.invoice.findUnique({
        where: { id },
    });
    return invoice;
};

const findAll = async (filter = {}) => {
    const invoices = await prisma.invoice.findMany({
        where: filter,
    });
    return invoices;
};

const invoiceRepo = {
    create,
    findById,
    findAll,
}

export default invoiceRepo;