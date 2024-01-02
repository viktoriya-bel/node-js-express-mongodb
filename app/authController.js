//импорты
const Role = require('./models/Role');
const User = require('./models/User');
const Completed = require('./models/Completed');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const generateAccessToken = require('./utils/generateAccessToken');



class authController {

  /**
   * Описание метода регистрации
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async registration (request, response){
    try{
      const validation = validationResult(request);
      if (!validation.isEmpty()) return response.status(400).json({ message: 'Ошибка валидации', validation });

      const { username, password, role_name } = request.body;

      const visitor = await User.findOne({ username });
      if (visitor) return response.status(400).json({ message: `Пользователь с логином ${ username } уже существует` });

      const hashPassword = bcrypt.hashSync(password, 5);
      const isAdmin = role_name === 'admin';
      const userRole = await Role.findOne({ value: isAdmin ? 'admin' : 'user' });

      const user = new User({ username, password: hashPassword, roles: [ userRole.value ]});
      await user.save();
      return response.json({ message: "Произошла регистрация пользователя" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ message: 'Ошибка регистрации!' });
    }
  }

  /**
   * Описание метода авторизации
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async login (request, response){
    try{
      const { username, password } = request.body;
      const user = await User.findOne({ username });
      if (!user) return response.status(400).json({ message: `Пользователь ${ username } не найден` });
      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) return response.status(400).json({ message: 'Введенный пароль неверен' });
      const token = generateAccessToken(user._id, user.roles);
      return response.json({ token })
    } catch (error) {
      console.log(error);
      response.status(400).json({ message: 'Ошибка авторизации!' });
    }
  }

  async completed(request, response){
    try{
      const { username, date_completed, block, time } = request.body;
      const user = await User.findOne({ username });
      if (!user) return response.status(400).json({ message: `Пользователь ${ username } не найден` });
      const completed = new Completed({ username, date_completed, block, time });
      completed.save();
      return response.json({ message: "Данные записаны!" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ message: 'Ошибка!' });
    }
  }

  async getCompleted(request, response){
    try{
      const { username } = request.query;
      const completedArray = await Completed.find({ username });
      return response.json(completedArray);
    } catch (error) {
      console.log(error);
      response.status(400).json({ message: 'Ошибка!' });
    }
  }

  /**
   * Получение всех пользователей с ролью 'user'
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async getUsers (request, response){
    try{
      const users = await User.find({ roles: ['user'] });
      return response.json(users);
    } catch (error) {
      console.log(error);
      response.status(400).json({ message: 'Ошибка получения списка пользователей!' });
    }
  }

  /**
   * Получение всех пользователей не зависимо от роли
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async getAllUsers (request, response){
    try{
      const users = await User.find();
      return response.json(users);
    } catch (error) {
      console.log(error);
      response.status(400).json({ message: 'Ошибка получения списка пользователей!' });
    }
  }

  /**
   * Метод добавления ролей в бд
   * @param request
   * @param response
   * @returns {Promise<void>}
   */
  async roleInit (request, response){
    try{
      const userRole = new Role();
      const adminRole = new Role({ value: 'admin' });
      await userRole.save();
      await adminRole.save();
      await response.json('ok');
    } catch (error) {
      console.log(error);
      response.status(400).json({ message: 'Ошибка создания ролей в базу данных!' });
    }
  }
}

module.exports = new authController();
