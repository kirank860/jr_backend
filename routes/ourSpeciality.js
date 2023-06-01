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

router
  .route("/")
  .post(createOurSpeciality)
  .get(reqFilter, getOurSpeciality)
  .put(updateOurSpeciality)
  .delete(deleteOurSpeciality);

router.get("/get-by-ourspeciality", getByFranchise);

module.exports = router;
