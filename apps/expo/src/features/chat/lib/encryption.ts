import CryptoJS from 'crypto-js';

const SECRET = 'venturesci-encrypted-channel';

export const encryptMessage = (message: string): string => {
  return CryptoJS.AES.encrypt(message, SECRET).toString();
};

export const decryptMessage = (payload: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(payload, SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return 'Unable to decrypt';
  }
};
