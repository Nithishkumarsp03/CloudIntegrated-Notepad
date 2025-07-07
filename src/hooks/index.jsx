import { create } from "zustand";
import CryptoJS from "crypto-js";

const SECRET = "your-secret-key";

const hashKey = (key) => CryptoJS.SHA256(key).toString();

const encrypt = (text) => {
    const string = typeof text === "string" ? text : JSON.stringify(text);
    return CryptoJS.AES.encrypt(string, SECRET).toString();
};

const decrypt = (cipher) => {
    if (!cipher) return null;
    try {
        const bytes = CryptoJS.AES.decrypt(cipher, SECRET);
        const original = bytes.toString(CryptoJS.enc.Utf8);
        try {
            return JSON.parse(original);
        } catch {
            return original;
        }
    } catch (err) {
        console.error("Decryption failed:", err);
        return null;
    }
};

export const useSecureStorageStore = create(() => ({
    setItem: (key, value) => {
        const hashedKey = hashKey(key);
        const existingEncrypted = localStorage.getItem(hashedKey);
        const newEncrypted = encrypt(value);

        if (existingEncrypted !== newEncrypted) {
            localStorage.setItem(hashedKey, newEncrypted);
        }
    },
      
    getItem: (key) => {
        const hashedKey = hashKey(key);
        const encryptedValue = localStorage.getItem(hashedKey);
        return decrypt(encryptedValue);
      },
    removeItem: (key) => {
        const hashedKey = hashKey(key);
        localStorage.removeItem(hashedKey);
    },

    clear: () => {
        localStorage.clear();
    }
}));
