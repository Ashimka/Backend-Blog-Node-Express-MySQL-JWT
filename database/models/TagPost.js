module.exports = (sequelize, DataTypes) => {
  const TagPost = sequelize.define(
    "tag_post",
    {
      tagOne: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tagTwo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tagThree: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return TagPost;
};
