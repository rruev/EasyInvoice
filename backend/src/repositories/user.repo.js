import { prisma } from '../lib/prisma.js';

const create = async (user) => {
    const newUser = await prisma.user.create({
        data: user
    });
    return newUser;
}

const findByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });
    return user;
}

const userRepo = {
    create,
    findByEmail
}

export default userRepo;