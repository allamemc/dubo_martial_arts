const secret = require("crypt");
const randomData = Math.random().toString();

const encryptedData = secret.encrypt(randomData);

module.exports = encryptedData;
