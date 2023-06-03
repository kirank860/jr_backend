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

router
  .route("/")
  .post(
    getUploadMiddleware("uploads/ourspeciality", ["specialityImage", "bannerImage"]),
    getS3Middleware(["specialityImage", "bannerImage"]),
    createOurSpeciality
  )
  .get(reqFilter, getOurSpeciality)
  .put(updateOurSpeciality)
  .delete(deleteOurSpeciality);

router.get("/get-by-ourspeciality", getByFranchise);

module.exports = router;
