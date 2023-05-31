const router = require("express").Router();
// Controllers
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
// Middleware
const { protect, authorize } = require("../middleware/auth");

router.get("/get-all-users", getAllUsers);

router
  .route("/")
  .post(createUser)
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
