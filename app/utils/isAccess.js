/**
 * Функция определяющая есть ли доступ у пользователя.
 * @param userRoles { Array<string> } - список прав, которые есть у пользователя
 * @param roles { Array<string> } - список прав, у которых есть доступ к данному методу
 * @returns {boolean}
 */
module.exports = function(userRoles, roles) {
  if (!userRoles || !roles) return false;
  return !!userRoles.find((role) => roles.includes(role));
}
