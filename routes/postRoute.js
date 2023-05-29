const Router = require("express");
const router = new Router();

const postController = require("../controllers/postController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/rolesList");

router.post("/", verifyJWT, postController.createPost);
router.post(
  "/tags",
  verifyJWT,
  verifyRoles(ROLES_LIST.admin),
  postController.createTags
);
router.get("/:id", postController.getOnePost);
router.delete(
  "/:id",
  verifyJWT,
  verifyRoles(ROLES_LIST.admin),
  postController.removePost
);
router.patch("/:id/edit", verifyJWT, postController.updatePost);

module.exports = router;
