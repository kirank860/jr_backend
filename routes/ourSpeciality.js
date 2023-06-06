const router = require("express").Router();
// Controllers
const {
  createOurSpeciality,
  getOurSpeciality,
  updateOurSpeciality,
  deleteOurSpeciality,
  getByFranchise,
} = require("../controllers/ourSpeciality");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");
const { getS3Middleware } = require("../middleware/s3client");
const getUploadMiddleware = require("../middleware/upload");

const uploadMiddleware = getUploadMiddleware("uploads/ourspeciality", [
  "specialityImage",
  "bannerImage",
]);

router
  .route("/")
  .post(
    uploadMiddleware,
    getS3Middleware(["specialityImage", "bannerImage"]),
    createOurSpeciality
  )
  .get(reqFilter, getOurSpeciality)
  .put(
    uploadMiddleware,
    getS3Middleware(["specialityImage", "bannerImage"]),
    updateOurSpeciality
  )
  .delete(deleteOurSpeciality);

router.get("/get-by-ourspeciality", getByFranchise);

module.exports = router;
