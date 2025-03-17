const router = require("express").Router();
const { getUsers, updateUser, deleteUser } =
  require("../controllers/user.controller");

router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
