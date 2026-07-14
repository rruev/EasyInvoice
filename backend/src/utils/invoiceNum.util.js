export const getNextInvoiceNum = (invoice) => {
    const currentYear = new Date().getFullYear();
    if (!invoice) {
        return `${currentYear}-001`;
    }

    const lastInvoiceNumber = parseInt(invoice.invoiceNum.split('-')[1], 10);
    const nextInvoiceNumber = lastInvoiceNumber + 1;

    return `${currentYear}-${String(nextInvoiceNumber).padStart(3, '0')}`;
};