import { AuthContext } from '../context/AuthContext';
import { use } from 'react';

import userService from '../services/user.service';

export const useUser = () => {
    const ctx = use(AuthContext);
    if (!ctx) {
        throw new Error('useUser must be used within an AuthProvider');
    }
    const { userData, isLoading, error, setError, signUp, signIn, signOut, fetchUser, deleteUser } = ctx;

    const updateUser = async (userData) => {
        try {
            await userService.updateUser(userData);
        } catch (err) {
            throw err.errors || { general: ["Failed to update user."] };
        }
    };

    return { userData, isLoading, error, setError, signUp, signIn, signOut, fetchUser, updateUser, deleteUser };
}

export default useUser;