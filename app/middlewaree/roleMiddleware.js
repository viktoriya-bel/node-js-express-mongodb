const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const isAccess = require('../utils/isAccess');

/**
 * Middleware запрещающий доступ если у пользователя нет прав администратора
 * @param roles
 * @returns {Function}
 */
module.exports = function(roles) {
  return function(request, response, next) {
    if(request.method === "OPTIONS") next();

    try {
      const token = request.headers.authorization.split(' ')[1];
      if(!token) return response.status(403).json({ message: "Пользователь не авторизован" });

      const { roles: userRoles } = jwt.verify(token, secret);

      if (!isAccess(userRoles, roles)) return response.status(403).json({ message: "Доступ запрещен" });

      next();
    } catch (error) {
      console.log(error);
      response.status(403).json({ message: 'Пользователь не авторизован' });
    }
  }

}
