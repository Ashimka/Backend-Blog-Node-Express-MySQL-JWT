const db = require("../database/models");

const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.userId;
    const postId = req.params.id;

    const newComment = await db.comment.create({
      text,
      userId,
      postId,
    });

    return res.status(201).json({ newComment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "message": error.message });
  }
};

module.exports = { createComment };
