// rsaEncryption.js
const NodeRSA = require('node-rsa');

// Crear una nueva instancia de NodeRSA y generar claves
const key = new NodeRSA({ b: 512 });
const publicKey = key.exportKey('public');
const privateKey = key.exportKey('private');

// Función para encriptar un mensaje usando la clave pública
function encryptRSA(plaintext) {
  const key = new NodeRSA(publicKey);
  return key.encrypt(plaintext, 'base64');
}

// Función para desencriptar un mensaje usando la clave privada
function decryptRSA(ciphertext) {
  const key = new NodeRSA(privateKey);
  return key.decrypt(ciphertext, 'utf8');
}

module.exports = { encryptRSA, decryptRSA };
