import { getErrors } from '../utils/errors.util';

const create = async (clientData) => {
    const response = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
        credentials: 'include'
    });

    if (!response.ok) {
        const error = await getErrors(response);
        throw error;
    }

    return await response.json();
}

const getAll = async () => {
    const response = await fetch('http://localhost:3000/api/clients', {
        method: 'GET',
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
}

const getById = async (clientId) => {
    const response = await fetch(`http://localhost:3000/api/clients/${clientId}`, {
        method: 'GET',
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
}

const update = async (clientId, clientData) => {
    const response = await fetch(`http://localhost:3000/api/clients/${clientId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
        credentials: 'include'
    });

    if (!response.ok) {
        const error = await getErrors(response);
        throw error;
    }

    return await response.json();
}

const deleteClient = async (clientId) => {
    const response = await fetch(`http://localhost:3000/api/clients/${clientId}`, {
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
}

const clientService = {
    create,
    getAll,
    getById,
    update,
    deleteClient
};

export default clientService;