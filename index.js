require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const db = require("./database/models");
const corsOptions = require("./config/corsOptions.js");
const credentials = require("./middleware/credentials");
const router = require("./routes/index");

const app = express();

const PORT = process.env.PORT || 5006;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));

app.use("/", router);

const start = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Соединение с БД было успешно установлено");

    // await db.sequelize.sync({ alter: true });
    // console.log("Все модели синхронизированы");

    app.listen(PORT, () => {
      console.log(`Сервер запущен успешно, номер порта: ${PORT}`);
    });
  } catch (error) {
    console.error("Невозможно выполнить подключение к БД: ", error);
  }
};

start();
