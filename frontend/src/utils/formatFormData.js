export const formatIban = (iban) => {
    if (!iban) return "";
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

export const prepareAddress = (street, num, postal, city) => {
    const safeStreet = (street ?? "").trim();
    const safeNum = (num ?? "").trim();
    const safePostal = (postal ?? "").trim();
    const safeCity = (city ?? "").trim();

    if (!safeStreet || !safeNum || !safePostal || !safeCity) {
        return "";
    }

    return `${safeStreet} ${safeNum}, ${safePostal} ${safeCity}`;
};

export const parseAddress = (address) => {
    const emptyAddress = { street: "", num: "", streetNum: "", postal: "", city: "" };

    if (!address || typeof address !== "string") {
        return emptyAddress;
    }

    const normalized = address.trim();
    const [streetPart = "", cityPart = ""] = normalized.split(",").map((part) => part.trim());

    const streetMatch = streetPart.match(/^(.*?)(?:\s+(\d+[A-Za-z]?))?$/);
    const cityMatch = cityPart.match(/^(\d{4,5})\s+(.+)$/);

    if (!streetMatch && !cityMatch) {
        return emptyAddress;
    }

    const street = streetMatch?.[1]?.trim() ?? "";
    const num = streetMatch?.[2]?.trim() ?? "";
    const postal = cityMatch?.[1]?.trim() ?? "";
    const city = cityMatch?.[2]?.trim() ?? "";

    return { street, num, streetNum: num, postal, city };
};

