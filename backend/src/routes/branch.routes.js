const router = require("express").Router();
const {
  getBranches,
  getBranch,
  createBranch,
  updateBranch,
  deleteBranch,
  getNearbyBranches,
} = require("../controllers/branch.controller");

// Base route: /api/branches
router.get("/", getBranches);
router.get("/nearby", getNearbyBranches);
router.get("/:id", getBranch);
router.post("/", createBranch);
router.put("/:id", updateBranch);
router.delete("/:id", deleteBranch);

module.exports = router;
