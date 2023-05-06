module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "460050",
  DB: "my_blog",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
