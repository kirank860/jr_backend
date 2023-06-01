const router = require("express").Router();
// Controllers
const {
  createOurProduct,
  getOurProduct,
  updateOurProduct,
  deleteOurProduct,
  getByFranchise,
} = require("../controllers/ourProduct");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");

router
  .route("/")
  .post(createOurProduct)
  .get(reqFilter, getOurProduct)
  .put(updateOurProduct)
  .delete(deleteOurProduct);

router.get("/get-by-ourproduct", getByFranchise);

module.exports = router;
