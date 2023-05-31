const router = require("express").Router();
// Controllers
const {
  createSocialMedia,
  getSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
  getByFranchise,
} = require("../controllers/socialMedia");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");

router
  .route("/")
  .post(createSocialMedia)
  .get(reqFilter, getSocialMedia)
  .put(updateSocialMedia)
  .delete(deleteSocialMedia);

router.get("/get-by-socialmedia", getByFranchise);

module.exports = router;
