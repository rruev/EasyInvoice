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
            clients: true,
            invoices: {
                orderBy: {
                    createdAt: 'desc'
                },
            }
        }
    });
    return user;
}

const update = async (userData) => {
    console.log("Updating user:", userData);
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

const userRepo = {
    create,
    findByEmail,
    update,
    remove,
};

export default userRepo;