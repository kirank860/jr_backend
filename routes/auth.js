const router = require("express").Router();
//
const { login, getMe } = require("../controllers/auth");
const { protect, authorize } = require("../middleware/auth");

router.post("/login", login);

router.get("/get_me", protect, getMe);

module.exports = router;
