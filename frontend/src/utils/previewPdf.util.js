export const previewPdf = async (pdfData) => {
    if (!pdfData || !(pdfData instanceof Blob)) {
        console.error("No valid PDF data available for preview.");
        return;
    }

    const pdfUrl = URL.createObjectURL(pdfData);
    const newWindow = window.open(pdfUrl, "_blank", "noopener,noreferrer");

    if (!newWindow) {
        URL.revokeObjectURL(pdfUrl);
        console.error("The browser blocked the PDF preview popup.");
        return;
    }

    setTimeout(() => {
        URL.revokeObjectURL(pdfUrl);
    }, 1000);
};