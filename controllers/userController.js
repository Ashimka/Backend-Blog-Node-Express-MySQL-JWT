const db = require("../database/models/index.js");

const getMe = async (req, res) => {
  try {
    const userId = req.id;

    const user = await db.user.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.json({
        message: "Такого пользователя не существует",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.json({ message: "Нет доступа" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await db.user.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ "message": error.message });
  }
};

module.exports = {
  getMe,
  getAllUsers,
};
