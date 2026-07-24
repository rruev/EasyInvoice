import { Router } from 'express';
import userService from '../services/user.service.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { userUpdateSchema } from '../schemas/user.schema.js';
import { getErrors } from '../utils/error.util.js';

const userController = Router();

userController.put('/update', isAuthenticated, async (req, res) => {
    try {
        const userData = userUpdateSchema.parse(req.body);

        const updatedUser = await userService.updateUser({ ...userData, id: req.user.id });

        res.json({
            message: 'User updated successfully',
        });
    } catch (error) {
        const errors = getErrors(error);

        res.status(400).json({
            message: 'User update failed',
            errors: errors
        });
    }
});

userController.delete('/delete', isAuthenticated, async (req, res) => {
    try {
        await userService.deleteUser(req.user.id);
        res.clearCookie('auth-token');

        res.json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        const errors = getErrors(error);

        res.status(400).json({
            message: 'User deletion failed',
            errors: errors
        });
    }
});

export default userController;