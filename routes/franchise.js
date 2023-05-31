const router = require("express").Router();
// Controllers
const {
  getAllFranchises,
  createFranchise,
  getFranchise,
  updateFranchise,
  deleteFranchise,
} = require("../controllers/franchise");
// Middleware
const { protect, authorize } = require("../middleware/auth");

router.get("/get-all-franchises", getAllFranchises);

router
  .route("/")
  .post(createFranchise)
  .get(getFranchise)
  .put(updateFranchise)
  .delete(deleteFranchise);

module.exports = router;
