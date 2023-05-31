const router = require("express").Router();
// Controllers
const {
  createPostCategory,
  getPostCategory,
  updatePostCategory,
  deletePostCategory,
  getByFranchise,
} = require("../controllers/postCategory");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");

router
  .route("/")
  .post(createPostCategory)
  .get(reqFilter, getPostCategory)
  .put(updatePostCategory)
  .delete(deletePostCategory);

router.get("/get-by-postcategory", getByFranchise);

module.exports = router;
