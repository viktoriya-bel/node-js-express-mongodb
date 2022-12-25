const { secret } = require('../config');
const jwt = require('jsonwebtoken');

/**
 * Функция генерации jwt-токена
 * @param idUser { ObjectId }
 * @param roles { Array<string> }
 * @returns {undefined|*}
 */
const generateAccessToken = (idUser, roles) => {
  const  payload = {
    idUser,
    roles,
  }
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

module.exports = generateAccessToken;
