const multer = require("multer");

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "static");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

module.exports = storage;
