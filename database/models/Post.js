module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    viewsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    imageURL: {
      type: DataTypes.STRING,
    },
    // tags: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  });

  return Post;
};