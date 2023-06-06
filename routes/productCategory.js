const router = require("express").Router();
// Controllers
const {
  createProductCategory,
  getProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getByFranchise,
  select,
} = require("../controllers/productCategory");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");

router
  .route("/")
  .post(createProductCategory)
  .get(reqFilter, getProductCategory)
  .put(updateProductCategory)
  .delete(deleteProductCategory);

router.get("/get-by-productcategory", getByFranchise);

router.get("/select", reqFilter, select);

module.exports = router;
