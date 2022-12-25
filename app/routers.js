//импорты
const Router = require('express');
const controller = require('./authController');
const { check } = require('express-validator');
const authMiddleware = require('./middlewaree/authMiddleware');
const roleMiddleware = require('./middlewaree/roleMiddleware');

//создание экземпляра класса
const router = new Router();

/**
 * Событие на подписку Post-запроса для регистрации пользователя с валидацией по логину и паролю
 */
router.post('/registration', [
    check('username', 'Поле "Логин" не может быть пустым').notEmpty(), check('password', 'Пороль должен быть больше 3 символов').isLength({ min: 3 }),
], function(request, response){ controller.registration(request, response) });

/**
 * Событие на подписку Post-запроса для авторизации пользователей
 */
router.post('/login', function(request, response){ controller.login(request, response) });

/**
 * Событие на подписку Get-запроса для получения списка пользователей.
 * Доступ возможет только для пользователя с ролью 'admin'
 */
router.get('/all-users', roleMiddleware(['admin']), function(request, response){ controller.getAllUsers(request, response) });

/**
 * Событие на подписку Get-запроса для получения списка пользователей с ролью 'user'.
 * Доступ возможет только для авторизованных пользователей
 */
router.get('/users', authMiddleware, function(request, response){ controller.getUsers(request, response) });

/**
 * Событие на подписку Get-запроса для создание ролей в базе данных
 */
router.get('/init-role', function(request, response){ controller.roleInit(request, response) });

module.exports = router;
