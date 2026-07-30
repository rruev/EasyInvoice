import userRepo from '../repositories/user.repo.js';
import { encryptData } from '../utils/encrypt.util.js';

const updateUser = async (userData) => {
    if (userData.iban) {
        userData.iban = encryptData(userData.iban);
    }

    const updatedUser = await userRepo.update(userData);
    return updatedUser;
};

const deleteUser = async (userId) => {
    await userRepo.remove(userId);
};

const userService = {
    updateUser,
    deleteUser,
};

export default userService;