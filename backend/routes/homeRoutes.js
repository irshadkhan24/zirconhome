const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const upload = require("../middleware/uploadMiddleware");

// GET HOME DATA
router.get("/", homeController.getHome);

// UPDATE HOME DATA (with file uploads)
router.post("/", upload.any(), homeController.updateHome);

// DELETE HERO SLIDE
router.delete("/hero/:id", homeController.deleteHeroSlide);

// DELETE PARTY
router.delete("/party/:id", homeController.deleteParty);

module.exports = router;