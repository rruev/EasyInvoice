export const previewPdf = async (pdfData) => {
    if (pdfData) {
        const pdfUrl = URL.createObjectURL(pdfData);
        window.open(pdfUrl, "_blank");
    } else {
        console.error("No PDF data available for preview.");
    }
};