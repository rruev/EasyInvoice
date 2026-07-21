import * as z from 'zod';

export const getErrors = (error) => {
    let errors = {};

    if (error.name === 'ZodError') {
        errors = z.flattenError(error).fieldErrors;
    } else if (error.name === 'PrismaClientKnownRequestError') {
        if (error.code === 'P2002') {
            errors = { email: ['Email already exists'] };
        }
    } else if (error.name === 'InvalidPasswordError') {
        errors = { password: ['Invalid password'] };
    } else if (error.name === 'UserNotFoundError') {
        errors = { email: ['User with this email does not exist'] };
    }
    return errors;
}