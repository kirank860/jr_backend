const router = require("express").Router();
// Controllers
const {
  createContactUs,
  getContactUs,
  updateContactUs,
  deleteContactUs,
  getByFranchise
} = require("../controllers/contactUs");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");
const { getS3Middleware } = require("../middleware/s3client");
const getUploadMiddleware = require("../middleware/upload");

router
  .route("/")
  .post(
    getUploadMiddleware("uploads/contactus", ["contactusImage"]),
    getS3Middleware(["contactusImage"]),
    createContactUs
  )
  .get(reqFilter, getContactUs)
  .put(updateContactUs)
  .delete(deleteContactUs);

router.get("/get-by-contactus", getByFranchise);

module.exports = router;
