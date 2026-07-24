import userRepo from '../repositories/user.repo.js';

const updateUser = async (userData) => {
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