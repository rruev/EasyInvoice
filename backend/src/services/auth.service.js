import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userRepo from '../repositories/user.repo.js';
import tokenUtil from '../utils/token.util.js';
import { getNextInvoiceNum } from '../utils/invoiceNum.util.js';
import { get } from 'node:http';

const register = async (userData) => {
    if (!userData.email || !userData.password) {
        throw new Error('Email and password are required');
    }

    if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await userRepo.create({
        email: userData.email,
        password: hashedPassword
    });

    const token = tokenUtil.generateToken(user);
    return { user, token};
}

const login = async (userData) => {
    if (!userData.email || !userData.password) {
        throw new Error('Email and password are required');
    }

    const user = await userRepo.findByEmail(userData.email);

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(userData.password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const token = tokenUtil.generateToken(user);
    return { user, token };
}

const getByEmail = async (email) => {
    const user = await userRepo.findByEmail(email);
    
    if (!user) {
        throw new Error('User not found');
    }

    const nextInvoiceNum = getNextInvoiceNum(user.invoices[0]);
    user.nextInvoiceNum = nextInvoiceNum;

    return user;
}

const authService = {
    login,
    register,
    getByEmail
};

export default authService;