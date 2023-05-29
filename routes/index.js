const Router = require("express");

const router = new Router();

const postRoute = require("./postRoute");
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const uploadRoute = require("./uploadRoute");

router.use("/", authRoute);
router.use("/user", userRoute);
router.use("/post", postRoute);
router.use("/upload", uploadRoute);

module.exports = router;
