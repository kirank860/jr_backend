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

router
  .route("/")
  .post(createContactUs)
  .get(reqFilter, getContactUs)
  .put(updateContactUs)
  .delete(deleteContactUs);

router.get("/get-by-contactus", getByFranchise);

module.exports = router;
