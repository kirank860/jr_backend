const router = require("express").Router();
// Controllers
const {
  getAllUserRoles,
  createUserRole,
  getUserRole,
  updateUserRole,
  deleteUserRole,
} = require("../controllers/userRole");
// Middleware
const { protect, authorize } = require("../middleware/auth");

router.get("/get-all-user-roles", getAllUserRoles);

router
  .route("/")
  .post(createUserRole)
  .get(getUserRole)
  .put(updateUserRole)
  .delete(deleteUserRole);

module.exports = router;
