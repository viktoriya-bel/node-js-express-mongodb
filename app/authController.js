const Role = require('./models/Role');
const User = require('./models/User');

class authController {
  async registration (request, response){
    try{
      await response.json('ok');
    } catch (error) {

    }
  }

  async login (request, response){
    try{
      await response.json('ok');
    } catch (error) {

    }
  }

  async getUsers (request, response){
    try{
      await response.json('ok');
    } catch (error) {

    }
  }
}

module.exports = new authController();
