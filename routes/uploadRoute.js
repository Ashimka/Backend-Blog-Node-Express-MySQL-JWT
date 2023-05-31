const Router = require("express");
const multer = require("multer");

const verifyJWT = require("../middleware/verifyJWT");
const storage = require("../middleware/storageUploads");

const router = new Router();

const upload = multer({ storage });

router.post("/", verifyJWT, upload.single("image"), (req, res) => {
  console.log(req.file);
  res.json({
    url: `/${req.file.filename}`,
  });
});

module.exports = router;
