//импорты
const Router = require('express');
const controller = require('./authController')

//создание экземпляра класса
const router = new Router();

//эвент на подписку прослушивания http-запросов
router.post('/registration', function(request, response){ controller.registration(request, response) });
router.post('/login', function(request, response){ controller.login(request, response) });
router.get('/users', function(request, response){ controller.getUsers(request, response) });

module.exports = router;
