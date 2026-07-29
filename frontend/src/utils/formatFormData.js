export const formatIban = (iban) => {
    if (!iban) return '';
    const cleanedIban = iban.replace(/\s+/g, '').toUpperCase();
    const formattedIban = cleanedIban.replace(/(.{4})(?=.)/g, '$1 ').trim();
    return formattedIban;
};

export const formatDate = (date) => {
    if (!date) return "";

    const digits = date.replace(/\D/g, "").slice(0, 8);

    if (digits.length <= 2) {
        return digits.length === 2 ? digits + "." : digits;
    }

    if (digits.length <= 4) {
        const monthPart = digits.slice(2);
        return digits.slice(0, 2) + "." + monthPart + (digits.length === 4 ? "." : "");
    }

    return digits.slice(0, 2) + "." + digits.slice(2, 4) + "." + digits.slice(4);
};