import clientService from "../services/client.service";
import { useState } from "react";

export const useClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const createClient = async (clientData) => {
        setIsLoading(true);
        setError(null);

        try {
            const newClient = await clientService.create(clientData);
            return newClient;
        } catch (err) {
            setError(err.errors || { general: ['An error occurred while creating the client.'] });
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    // this i am not using it anywhere as i fethc the clients with the user 
    //TODO render the clients on the client page with this function 
    const fetchClients = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await clientService.getAll();
            return data;
        } catch (err) {
            setError(err.errors || { general: ['An error occurred while fetching clients.'] });
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    const fetchClientById = async (clientId) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await clientService.getById(clientId);
            return data;
        } catch (err) {
            setError(err.errors || { general: ['An error occurred while fetching the client.'] });
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    const updateClient = async (clientId, clientData) => {
        setIsLoading(true);
        setError(null);

        try {
            const updatedClient = await clientService.update(clientId, clientData);
            return updatedClient;
        } catch (err) {
            setError(err.errors || { general: ['An error occurred while updating the client.'] });
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    const deleteClient = async (clientId) => {
        setIsLoading(true);
        setError(null);

        try {
            const deletedClient = await clientService.deleteClient(clientId);
            return deletedClient;
        } catch (err) {
            setError(err.errors || { general: ['An error occurred while deleting the client.'] });
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, error, setError, fetchClients, createClient, fetchClientById, updateClient, deleteClient };
}
