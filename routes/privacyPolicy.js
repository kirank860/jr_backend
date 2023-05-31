const router = require("express").Router();
// Controllers
const {
  createPrivacyPolicy,
  getPrivacyPolicy,
  updatePrivacyPolicy,
  deletePrivacyPolicy,
  getByFranchise,
} = require("../controllers/privacyPolicy");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");

router
  .route("/")
  .post(createPrivacyPolicy)
  .get(reqFilter, getPrivacyPolicy)
  .put(updatePrivacyPolicy)
  .delete(deletePrivacyPolicy);

router.get("/get-by-privacypolicy", getByFranchise);

module.exports = router;
