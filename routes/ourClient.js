const router = require("express").Router();
// Controllers
const {
  createOurClient,
  getOurClient,
  updateOurClient,
  deleteOurClient,
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

module.exports = router;
