import { prisma } from "../lib/prisma.js";

const create = async (invoiceData) => {
    const invoice = await prisma.invoice.create({
        data: {
            userId: invoiceData.userId,         
            invoiceNum: invoiceData.invoiceNum,   
            issuedAt: invoiceData.issuedAt,   
            workedAt: invoiceData.workedAt,   
            quantity: invoiceData.quantity,
            price: invoiceData.price,
            total: invoiceData.totalPrice,
            status: invoiceData.status,
            },
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

const update = async (invoiceId, updatedData) => {
    const updatedInvoice = await prisma.invoice.update({
        where: { id: invoiceId },
        data: updatedData,
    });
    return updatedInvoice;
};

const remove = async (invoiceId) => {
    await prisma.invoice.delete({
        where: { id: invoiceId },
    });
};

const invoiceRepo = {
    create,
    findById,
    findAll,
    update,
    remove,
};

export default invoiceRepo;