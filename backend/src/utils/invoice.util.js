const prepareData = (invoiceData) => {
    invoiceData.quantity = Number(invoiceData.quantity);
    invoiceData.price = parseFloat(invoiceData.price);
    invoiceData.lineTotal = Number(invoiceData.quantity) * parseFloat(invoiceData.price);

    invoiceData.items = invoiceData.items.map(item => ({
        ...item,
        quantity: Number(item.quantity),
        price: parseFloat(item.price),
        lineTotal: Number(item.quantity) * parseFloat(item.price),
    }));

    const totalPrice = invoiceData.items.reduce((total, item) => {
        return total + (item.quantity * item.price);
    }, 0);

    invoiceData.totalPrice = totalPrice;

    const businessAddress = separateAddress(invoiceData.businessAddress);
    invoiceData.businessStreet = businessAddress.street;
    invoiceData.businessCity = businessAddress.city;

    const clientAddress = separateAddress(invoiceData.clientAddress);
    invoiceData.clientStreet = clientAddress.street;
    invoiceData.clientCity = clientAddress.city;


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

export default prepareData;