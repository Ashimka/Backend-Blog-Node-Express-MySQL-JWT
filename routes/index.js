const Router = require("express");

const router = new Router();

const postRoute = require("./postRoute");
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");

router.use("/", authRoute);
router.use("/user", userRoute);
router.use("/post", postRoute);

module.exports = router;
