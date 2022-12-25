//импорты
const  express = require('express');
const mongoose = require('mongoose');
const router = require('./app/routers');

//порт
const PORT = 2356;

//создание сервера
const app = express();

//чтобы парсить json
app.use(express.json());
//подключение файла с маршрутизацией
app.use('/api', router);

/**
 * Метод запуска сервера
 * @returns {Promise<void>}
 */
const start = async () => {
  try {
    //само подключение к бд
    await mongoose.connect(
        'mongodb+srv://admin:admin@cluster0.gkccjpt.mongodb.net/auth?retryWrites=true&w=majority');
    app.listen(PORT, () => console.log('start server'));
  } catch (error) {
    console.log(error);
  }
}

start();
