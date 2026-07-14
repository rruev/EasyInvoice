 const fetchPdf = async (formData) => {
    const response = await fetch("http://localhost:3000/api/invoice/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    if (!response.ok) {
        console.error("Failed to submit invoice data");
        return;
    }

    return await response.blob();

}

const invoiceService = {
    fetchPdf
};

export default invoiceService;
