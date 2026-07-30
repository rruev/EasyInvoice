import Cryptr from "cryptr";

export const encryptData = (data) => {
    const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
    return cryptr.encrypt(data);
};

export const decryptData = (encryptedData) => {
    const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
    return cryptr.decrypt(encryptedData);
};