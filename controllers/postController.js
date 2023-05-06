const path = require("path");
const uuid = require("uuid");

const db = require("../database/models");

const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const { imageURL } = req.files;

    const fileExt = imageURL.name.split(".")[1];

    let faleName = uuid.v4() + `.${fileExt}`;

    imageURL.mv(path.resolve(__dirname, "..", "static", faleName));

    const post = await db.post.create({
      title,
      text,
      imageURL: faleName,
      userId: req.id,
    });

    const tagsPost = await db.tagPost.create({
      postId: post.id,
      tagOne: "React",
      tagTwo: "JavaScript",
      tagThree: "Web",
    });

    res.status(201).json({ message: "Post create!" });
  } catch (error) {
    res.status(500).json({ "message": error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await db.post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ "message": error.message });
  }
};

const getOnePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const postViews = await db.post.increment(
      { viewsCount: 1 },
      { where: { id: postId } }
    );

    const post = await db.post.findByPk(postId);
    const tagsPost = await db.tagPost.findOne({ where: { postId } });

    res.json({ post, tagsPost });
  } catch (error) {
    res.status(500).json({ "message": error.message });
  }
};

const removePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await db.post.findOne({ where: { id: postId } });

    if (!post) {
      return res.json({ message: "пост не найден" });
    }
    const result = await db.post.destroy({
      where: { id: postId },
    });

    res.json({ message: "Post deleted...." });
  } catch (error) {
    res.status(500).json({ "message": error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { imageURL } = req.files;

    const fileExt = imageURL.name.split(".")[1];

    let faleName = uuid.v4() + `.${fileExt}`;

    imageURL.mv(path.resolve(__dirname, "..", "static", faleName));

    const post = await db.post.findOne({
      where: {
        id: postId,
      },
    });

    if (post.userId === req.id) {
      post.title = req.body.title;
      post.text = req.body.text;
      post.imageURL = faleName;
      await post.save();
    }

    if (post.userId !== req.id) {
      return res.json({ message: "нет доступа" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ "message": error.message });
  }
};

const createTags = async (req, res) => {
  try {
    const { tag } = req.body;

    //   Проверка на дубликат
    const duplicate = await db.tagList.findOne({ where: { tag } });
    if (duplicate) {
      return res.status(409).json({ "message": `Тег #${tag} уже существует` });
    }

    const tagList = await db.tagList.create({
      tag,
    });

    res.status(201).json({ message: "Tag create!" });
  } catch (error) {
    res.status(500).json({ "message": error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getOnePost,
  removePost,
  updatePost,
  createTags,
};
