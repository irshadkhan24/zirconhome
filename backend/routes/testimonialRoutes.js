const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // 🔥 ADD THIS

const {
  addTestimonial,
  getTestimonials,
  deleteTestimonial,
  updateTestimonial
} = require("../controllers/testimonialController");

router.get("/", getTestimonials);

// 🔥 Image ke liye upload.single("image") add karo
router.post("/", auth, upload.single("image"), addTestimonial);

router.put("/:id", auth, upload.single("image"), updateTestimonial);

router.delete("/:id", auth, deleteTestimonial);

module.exports = router;