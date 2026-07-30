import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userRepo from '../repositories/user.repo.js';
import tokenUtil from '../utils/token.util.js';
import { getNextInvoiceNum } from '../utils/invoiceNum.util.js';
import { encryptData, decryptData } from '../utils/encrypt.util.js';

const register = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    if (userData.iban) {
        userData.iban = encryptData(userData.iban);
    }

    userData.confirmPassword = undefined;

    const user = await userRepo.create({
        ...userData,
        email: userData.email,
        password: hashedPassword
    });

    const token = tokenUtil.generateToken(user);
    return { user, token };
}

const login = async (userData) => {
    const user = await userRepo.findByEmail(userData.email);

    if (!user) {
        const error = new Error('User not found');
        error.name = 'UserNotFoundError';
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(userData.password, user.password);

    if (!isPasswordValid) {
        const error = new Error('Invalid password');
        error.name = 'InvalidPasswordError';
        throw error;
    }

    const token = tokenUtil.generateToken(user);
    return { user, token };

};

const getByEmail = async (email) => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
        throw new Error('User not found');
    }

    if (user.iban) {
        user.iban = decryptData(user.iban).slice(0, 4) + " XXXX XXXX XXXX XXXX";
    }

    const nextInvoiceNum = getNextInvoiceNum(user.invoices[0]);
    user.nextInvoiceNum = nextInvoiceNum;

    return user;
};

const authService = {
    login,
    register,
    getByEmail
};

export default authService;