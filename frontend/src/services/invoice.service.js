import { getErrors } from '../utils/errors.util';

const fetchPdf = async (formData) => {
    const response = await fetch("http://localhost:3000/api/invoices/generate", {
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

const getAll = async () => {
    const response = await fetch("http://localhost:3000/api/invoices", {
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
    const response = await fetch(`http://localhost:3000/api/invoices/${invoiceId}`, {
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
    const response = await fetch(`http://localhost:3000/api/invoices/${invoiceId}`, {
        method: "DELETE",
        credentials: "include"
    });

    if (!response.ok) {
        const error = await getErrors(response);
        throw error;
    }
};

const getStats = async () => {
    const response = await fetch("http://localhost:3000/api/invoices/stats", {
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
