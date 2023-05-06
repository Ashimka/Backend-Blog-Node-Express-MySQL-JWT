const Router = require("express");

const verifyJWT = require("../middleware/verifyJWT");
const userController = require("../controllers/userController");
const router = new Router();

router.get("/me", verifyJWT, userController.getMe);
router.get("/all", verifyJWT, userController.getAllUsers);

module.exports = router;
