const router = require("express").Router();
// Controllers
const {
  createTestimonial,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonial");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");

router
  .route("/")
  .post(createTestimonial)
  .get(reqFilter, getTestimonial)
  .put(updateTestimonial)
  .delete(deleteTestimonial);

module.exports = router;
