const router = require("express").Router();
// Controllers
const {
  createOurTeam,
  getOurTeam,
  updateOurTeam,
  deleteOurTeam,
  getByFranchise,
} = require("../controllers/ourTeam");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");

router
  .route("/")
  .post(createOurTeam)
  .get(reqFilter, getOurTeam)
  .put(updateOurTeam)
  .delete(deleteOurTeam);

router.get("/get-by-ourteam", getByFranchise);

module.exports = router;
