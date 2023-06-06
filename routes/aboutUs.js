const router = require("express").Router();
// Controllers
const {
  createAboutUs,
  getAboutUs,
  updateAboutUs,
  deleteAboutUs,
  getByFranchise,
} = require("../controllers/aboutUs");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");
const { getS3Middleware } = require("../middleware/s3client");
const getUploadMiddleware = require("../middleware/upload");

router
  .route("/")
  .post(
    getUploadMiddleware("uploads/aboutus", ["aboutusImage", "bannerImage", "visionImage", "missionImage", "featuresImage"]),
    getS3Middleware(["aboutusImage", "bannerImage", "visionImage", "missionImage", "featuresImage"]),
    createAboutUs
  )
  .get(reqFilter, getAboutUs)
  .put(updateAboutUs)
  .delete(deleteAboutUs);

router.get("/get-by-aboutus", getByFranchise);

module.exports = router;
