const Router = require("express");
const router = new Router();

const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const refreshController = require("../controllers/refreshController");
const logoutController = require("../controllers/logoutController");
const postController = require("../controllers/postController");

router.get("/", postController.getAllPosts);

router.post("/register", registerController.handleNewUser);
router.post("/login", loginController.handleLogin);
router.get("/refresh", refreshController.handleRefreshToken);
router.get("/logout", logoutController.handleLogout);

module.exports = router;
