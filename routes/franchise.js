const router = require("express").Router();
// Controllers
const {
  createFranchise,
  getFranchise,
  updateFranchise,
  deleteFranchise,
  select,
} = require("../controllers/franchise");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");
const { getS3Middleware } = require("../middleware/s3client");
const getUploadMiddleware = require("../middleware/upload");

router
  .route("/")
  .post(
    getUploadMiddleware("uploads/franchise", ["franchiseImage"]),
    getS3Middleware(["franchiseImage"]),
    createFranchise
  )
  .get(reqFilter, getFranchise)
  .put(updateFranchise)
  .delete(deleteFranchise);

router.get("/select", reqFilter, select);

module.exports = router;
