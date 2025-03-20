
const { register, login, getProfile } = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", getProfile);

module.exports = router;
