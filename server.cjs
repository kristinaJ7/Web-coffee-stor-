//отправка данных с фронтенда на бэкенд
const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');

// Настройка CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 3600,
  })
);

app.use(express.json());

app.use(express.static(path.join(__dirname, 'dist')));

app.get("/", (req, res) => {
  res.send("Сервер работает! Отправьте POST-запрос на /api/subscribe");
});

app.post("/api/subscribe", (req, res) => {
  if (req.get("content-type") !== "application/json") {
    return res.status(400).json({ error: "Требуется JSON" });
  }

  const { email } = req.body;
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Некорректный email" });
  }

  console.log("Получены данные:", req.body);
  res.json({ message: "Успешно сохранено!" });
});

app.listen(3000, () => {
  console.log("Сервер запущен на http://localhost:3000");
});


