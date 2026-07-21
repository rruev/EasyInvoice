export const register = async (userData) => {
    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            credentials: 'include' 
        });

        if (!response.ok) {
            throw new Error('Failed to register');
        }

        const newUser = await response.json();
        return newUser;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

export const login = async (userData) => {
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            const error = new Error(errorData.message || 'Failed to login');
            error.errors = errorData.errors || [];
            throw error;
        }

        return await response.json();
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/auth/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to logout');
        }

        return await response.json();
    } catch (error) {
        console.error('Error logging out user:', error);
        throw error;
    }
}

export const fetchUserData = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/auth/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}