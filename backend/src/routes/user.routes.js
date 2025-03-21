const router = require("express").Router();
const { getUsers, deleteUser, updateAddressUser } =
  require("../controllers/user.controller");

router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.put("/:id/address", updateAddressUser);

module.exports = router;
