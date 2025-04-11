const router = require("express").Router();
const { getUsers, deleteUser, updateAddressUser } =
  require("../controllers/user.controller");

///api/users/32/address
router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.put("/:id/address", updateAddressUser);

module.exports = router;
