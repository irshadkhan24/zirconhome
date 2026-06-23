const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  addAbout,
  getAbout,
  updateAbout,
  deleteAbout
} = require("../controllers/aboutController");

router.get("/", getAbout);
router.post("/", auth, upload.single("image"), addAbout);
router.put("/:id", auth, upload.single("image"), updateAbout);
router.delete("/:id", auth, deleteAbout);

module.exports = router;