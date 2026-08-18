import { getErrors } from '../utils/errors.util';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const updateUser = async (userData) => {
    const response = await fetch(`${API_URL}/api/users`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include'
    });

    if (!response.ok) {
        const error = await getErrors(response);
        throw error;
    }

    return await response.json();
};

export const deleteUser = async () => {
    const response = await fetch(`${API_URL}/api/users`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    if (!response.ok) {
        const error = await getErrors(response);
        throw error;
    }

    return await response.json();
};

const userService = {
    updateUser,
    deleteUser
};

export default userService;