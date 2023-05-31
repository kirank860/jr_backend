const router = require("express").Router();
// Controllers
const {
  createSiteIdentity,
  getSiteIdentity,
  updateSiteIdentity,
  deleteSiteIdentity,
  getByFranchise,
} = require("../controllers/siteIdentity");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");

router
  .route("/")
  .post(createSiteIdentity)
  .get(reqFilter, getSiteIdentity)
  .put(updateSiteIdentity)
  .delete(deleteSiteIdentity);

router.get("/get-by-siteidentity", getByFranchise);

module.exports = router;
