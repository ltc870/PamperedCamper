const express = require("express");
const router = express.Router();
const {
  getCampgrounds,
  addCampground,
  getMyCampgrounds,
  deleteCampground,
} = require("../controllers/campgroundController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getCampgrounds);
router.get("/mycampgrounds", protect, getMyCampgrounds);
router.post("/", protect, addCampground);
router.delete("/:_id", protect, deleteCampground);

module.exports = router;
