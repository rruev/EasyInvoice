const create = async (clientData) => {
    try {
        const response = await fetch('http://localhost:3000/api/client/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clientData),
            credentials: 'include'  
        });

        if (!response.ok) {
            throw new Error('Failed to create client');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating client:', error);
        throw error;
    }
}

const getAll = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/client', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'  
        });

        if (!response.ok) {
            throw new Error('Failed to fetch clients');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
    }
}

const clientService = {
    create,
    getAll
};

export default clientService;