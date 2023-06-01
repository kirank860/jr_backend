const router = require("express").Router();
// Controllers
const {
  createTermsOfService,
  getTermsOfService,
  updateTermsOfService,
  deleteTermsOfService,
  getByFranchise,
} = require("../controllers/termsOfService");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");

router
  .route("/")
  .post(createTermsOfService)
  .get(reqFilter, getTermsOfService)
  .put(updateTermsOfService)
  .delete(deleteTermsOfService);

router.get("/get-by-termsofservice", getByFranchise);

module.exports = router;
