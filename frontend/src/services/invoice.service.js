import { getErrors } from '../utils/errors.util';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const fetchPdf = async (formData) => {
    const response = await fetch(`${API_URL}/api/invoices/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
        credentials: "include"
    });

    if (!response.ok) {
        const error = await getErrors(response);
        throw error;
    }

    return await response.blob();

}

const getAll = async (page) => {
    const response = await fetch(`${API_URL}/api/invoices?page=${page}`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        const error = await getErrors(response);
        throw error;
    }

    return await response.json();
}

const update = async (invoiceId, updatedData) => {
    const response = await fetch(`${API_URL}/api/invoices/${invoiceId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData),
        credentials: "include"
    });

    if (!response.ok) {
        const error = await getErrors(response);
        throw error;
    }
}

const remove = async (invoiceId) => {
    const response = await fetch(`${API_URL}/api/invoices/${invoiceId}`, {
        method: "DELETE",
        credentials: "include"
    });

    if (!response.ok) {
        const error = await getErrors(response);
        throw error;
    }

    return await response.json();
};

const getStats = async () => {
    const response = await fetch(`${API_URL}/api/invoices/stats`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        const error = await getErrors(response);
        throw error;
    }

    return await response.json();
}

const invoiceService = {
    fetchPdf,
    getAll,
    update,
    remove,
    getStats
};

export default invoiceService;
