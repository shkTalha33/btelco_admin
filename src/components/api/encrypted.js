import CryptoJS from "crypto-js";
const secret_key = 'btelco__________secret__________key';
// const secret_key = process.env.REACT_APP_SECRET_KEY;

export const encryptData = (data) => {
  try {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secret_key
    ).toString();
    return encryptedData;
  } catch (error) {
    // console.error("Error encrypting data:", error);
  }
};

export const decryptData = (data) => {
  try {
    if (!data) {
      return null;
    }

    const bytes = CryptoJS.AES.decrypt(data, secret_key);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedString) {
      return null;
    }

    return JSON.parse(decryptedString);
  } catch (error) {
    // console.error("Error decrypting data:", error);
    return null;
  }
};