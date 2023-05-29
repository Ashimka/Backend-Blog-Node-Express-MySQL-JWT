const Router = require("express");
const multer = require("multer");

const verifyJWT = require("../middleware/verifyJWT");
const storage = require("../middleware/storageUploads");

const router = new Router();

const upload = multer({ storage });

router.post("/", verifyJWT, upload.single("image"), (req, res) => {
  res.json({
    url: `/static/${req.file.originalname}`,
  });
});

module.exports = router;
