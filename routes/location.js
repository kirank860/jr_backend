const router = require("express").Router();
// Controllers
const {
  createLocation,
  getLocation,
  updateLocation,
  deleteLocation,
  select,
} = require("../controllers/location");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");

router
  .route("/")
  .post(createLocation)
  .get(reqFilter, getLocation)
  .put(updateLocation)
  .delete(deleteLocation);

router.get("/select", reqFilter, select);

module.exports = router;
