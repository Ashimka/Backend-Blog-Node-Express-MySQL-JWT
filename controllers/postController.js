const path = require("path");
const uuid = require("uuid");

const db = require("../database/models");

const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;

    if (req.files) {
      const fileExt = imageURL.name.split(".")[1];

      let faleName = uuid.v4() + `.${fileExt}`;

      imageURL.mv(path.resolve(__dirname, "..", "static", faleName));

      const postWithImage = await db.post.create({
        title,
        text,
        imageURL: faleName,
        userId: req.id,
      });

      const tagsPost = await db.tagPost.create({
        postId: postWithImage.id,
        tagOne: "React",
        tagTwo: "JavaScript",
        tagThree: "Web",
      });

      res.status(201).json({ message: "Post create!" });
    }

    const newPost = await db.post.create({
      title,
      text,
      imageURL: "",
      userId: req.id,
    });

    const tagsPost = await db.tagPost.create({
      postId: newPost.id,
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
    const posts = await db.post.findAll({
      include: [
        { model: db.user, attributes: ["fullName", "avatarURL"] },
        { model: db.tagPost, attributes: ["tagOne", "tagTwo", "tagThree"] },
      ],
    });
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

    const post = await db.post.findOne({
      where: { id: postId },
      include: [
        { model: db.user, attributes: ["fullName", "avatarURL"] },
        { model: db.tagPost, attributes: ["tagOne", "tagTwo", "tagThree"] },
      ],
    });

    res.json({ post });
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
    const { title, text } = req.body;
    const id = req.params.id;

    const postUpdate = await db.post.findOne({
      where: { id },
    });

    if (req.files) {
      const fileExt = imageURL.name.split(".")[1];

      let faleName = uuid.v4() + `.${fileExt}`;

      imageURL.mv(path.resolve(__dirname, "..", "static", faleName));

      postUpdate.imageURL = faleName;
    }

    postUpdate.title = title;
    postUpdate.text = text;
    await postUpdate.save();

    res.json(postUpdate);
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
