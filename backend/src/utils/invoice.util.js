const prepareData = (invoiceData) => {
    const totalPrice = Number(invoiceData.price) * Number(invoiceData.quantity);
    invoiceData.totalPrice = totalPrice;
    invoiceData.lineTotal = totalPrice;

    const businessAddress = separateAddress(invoiceData.businessAddress);
    invoiceData.businessStreet = businessAddress.street;
    invoiceData.businessCity = businessAddress.city;

    const clientAddress = separateAddress(invoiceData.clientAddress);
    invoiceData.clientStreet = clientAddress.street;
    invoiceData.clientCity = clientAddress.city;

    invoiceData.issuedAt = formatDate(invoiceData.issuedAt);
    invoiceData.workedAt = formatDate(invoiceData.workedAt);

    return invoiceData;
}

const separateAddress = (address) => {
    if (!address || address.trim() === '') {
        return { street: '', city: '' };
    }
    const addressParts = address.split(',');
    const street = addressParts[0].trim();
    const city = addressParts[1].trim();

    return { street, city };
}

const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
}

export default prepareData;