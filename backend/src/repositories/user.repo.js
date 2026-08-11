import { prisma } from '../lib/prisma.js';

const create = async (user) => {
    const newUser = await prisma.user.create({
        data: user
    });
    return newUser;
}

const findByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            clients: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    address: true,
                },
            },
            invoices: {
                select: {
                    invoiceNum: true,
                },
                take: 1,
                orderBy: {
                    createdAt: 'desc',
                },
            },
        }
    });
    return user;
}

const update = async (userData) => {
    const updatedUser = await prisma.user.update({
        where: { id: userData.id },
        data: userData
    });
    return updatedUser;
}

const remove = async (userId) => {
    await prisma.user.delete({
        where: { id: userId },
    });
};

const getUserIban = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { iban: true }
    });
    return user?.iban || null;
};

const userRepo = {
    create,
    findByEmail,
    update,
    remove,
    getUserIban,
};

export default userRepo;