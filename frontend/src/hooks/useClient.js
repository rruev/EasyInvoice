import clientService from "../services/client.service";
import { useState } from "react";

export const useClient = () => {
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const createClient = async (clientData) => {
        setIsLoading(true);
        setError(null);

        try {
            const newClient = await clientService.create(clientData);
            setClients((prevClients) => [...prevClients, newClient]);
            return newClient;
        } catch (err) {
            setError('Failed to create client.');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    const fetchClients = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await clientService.getAll();
            setClients(data);
            return data;
        } catch (err) {
            setError('Failed to fetch clients.');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    return { clients, isLoading, error, fetchClients, createClient };
}
