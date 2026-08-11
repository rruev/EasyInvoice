import { prisma } from "../lib/prisma.js";

const create = async (invoiceData) => {
    const invoice = await prisma.invoice.create({
        data: {
            userId: invoiceData.userId,
            clientId: invoiceData.clientId,
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

const findAll = async (userId, filter = {}) => {
    const invoices = await prisma.invoice.findMany({
        where: { userId, ...filter },
        include: {
            client: {
                select: {
                    name: true,
                    address: true,
                },
            }
        },
        orderBy: {
            createdAt: "desc",
        },
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

const getStats = async (userId) => {
    const [totalInvoices, totalRevenue, pendingInvoices] = await Promise.all([
        prisma.invoice.count({
            where: { userId },
        }),
        prisma.invoice.aggregate({
            where: { userId },
            _sum: {
                total: true,
            },
        }),
        prisma.invoice.count({
            where: { userId, status: "pending" },
        }),
    ]);

    return {
        totalInvoices,
        totalRevenue: totalRevenue._sum.total || 0,
        pendingInvoices,
    };
};

const invoiceRepo = {
    create,
    findById,
    findAll,
    update,
    remove,
    getStats,
};

export default invoiceRepo;