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
const { getS3Middleware } = require("../middleware/s3client");
const getUploadMiddleware = require("../middleware/upload");

router
  .route("/")
  .post(
    getUploadMiddleware("uploads/ourproduct", ["productImage"]),
    getS3Middleware(["productImage"]),
    createOurProduct
  )
  .get(reqFilter, getOurProduct)
  .put(updateOurProduct)
  .delete(deleteOurProduct);

router.get("/get-by-ourproduct", getByFranchise);

module.exports = router;
