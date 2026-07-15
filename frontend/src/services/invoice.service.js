 const fetchPdf = async (formData) => {
    const response = await fetch("http://localhost:3000/api/invoice/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
        credentials: "include" 
    });

    if (!response.ok) {
        console.error("Failed to submit invoice data");
        return;
    }

    return await response.blob();

}

const update = async (invoiceId, updatedData) => {
    const response = await fetch(`http://localhost:3000/api/invoice/update/${invoiceId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData),
        credentials: "include"
    });

    if (!response.ok) {
        console.error("Failed to update invoice");
        return;
    }

    return await response.json();
}

const remove = async (invoiceId) => {
    const response = await fetch(`http://localhost:3000/api/invoice/delete/${invoiceId}`, {
        method: "DELETE",
        credentials: "include"
    });

    if (!response.ok) {
        console.error("Failed to delete invoice");
        return;
    }
};

const invoiceService = {
    fetchPdf,
    update,
    remove
};

export default invoiceService;
