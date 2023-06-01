const router = require("express").Router();
// Controllers
const {
  createPostManagement,
  getPostManagement,
  updatePostManagement,
  deletePostManagement,
  getByFranchise,
} = require("../controllers/postManagement");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");

router
  .route("/")
  .post(createPostManagement)
  .get(reqFilter, getPostManagement)
  .put(updatePostManagement)
  .delete(deletePostManagement);

router.get("/get-by-postmanagement", getByFranchise);

module.exports = router;
