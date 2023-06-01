const router = require("express").Router();
// Controllers
const {
  createOurClient,
  getOurClient,
  updateOurClient,
  deleteOurClient,
  getByFranchise,
} = require("../controllers/ourClient");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");

router
  .route("/")
  .post(createOurClient)
  .get(reqFilter, getOurClient)
  .put(updateOurClient)
  .delete(deleteOurClient);

router.get("/get-by-ourclient", getByFranchise);

module.exports = router;
