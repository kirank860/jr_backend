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
const { getS3Middleware } = require("../middleware/s3client");
const getUploadMiddleware = require("../middleware/upload");

router
  .route("/")
  .post(createSiteIdentity)
  .post(
    getUploadMiddleware("uploads/siteidentity", ["logo"]),
    getS3Middleware(["logo"]),
    createSiteIdentity
  )
  .get(reqFilter, getSiteIdentity)
  .put(updateSiteIdentity)
  .delete(deleteSiteIdentity);

router.get("/get-by-siteidentity", getByFranchise);

module.exports = router;
