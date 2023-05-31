const multer = require("multer");
const uuid = require("uuid");

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "static");
  },

  filename: (_, file, cb) => {
    const fileExt =
      file.originalname.split(".")[file.originalname.split(".").length - 1];

    let faleName = uuid.v4() + `.${fileExt}`;

    cb(null, faleName);
  },
});

module.exports = storage;
