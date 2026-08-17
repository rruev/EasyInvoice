export const previewPdf = async (pdfData) => {
    if (!pdfData || !(pdfData instanceof Blob)) {
        console.error("No valid PDF data available for preview.");
        return;
    }

    const pdfUrl = URL.createObjectURL(pdfData);
    const newWindow = window.open(pdfUrl, "_blank", "noopener,noreferrer");

    if (!newWindow) {
        URL.revokeObjectURL(pdfUrl);
        console.log("successfully revoked the object URL for the PDF preview.");
        console.error("The browser blocked the PDF preview popup.");
        return;
    }

    const cleanup = () => {
        try {
            URL.revokeObjectURL(pdfUrl);
        } catch (error) {
            console.warn("Failed to revoke PDF preview URL.", error);
        }
    };

    newWindow.addEventListener("load", () => {
        if (newWindow.location.href.startsWith("blob:")) {
            return;
        }

        cleanup();
    }, { once: true });

    newWindow.addEventListener("beforeunload", cleanup, { once: true });
};