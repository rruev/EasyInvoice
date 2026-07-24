import { getErrors } from '../utils/errors.util';

export const updateUser = async (userData) => {
    const response = await fetch('http://localhost:3000/api/user/update', {
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
    const response = await fetch('http://localhost:3000/api/user/delete', {
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