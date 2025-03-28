// src/utils/encryption.js
import CryptoJS from 'crypto-js';

const AES_SECRET_KEY = "9387267452"; // Asegúrate de usar una clave segura

// Función para encriptar con AES
export const encryptAES = (text) => {
  return CryptoJS.AES.encrypt(text, AES_SECRET_KEY).toString();
};
