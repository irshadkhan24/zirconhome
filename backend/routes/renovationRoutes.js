const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const {
  addRenovationWork,
  getRenovationWorks,
  deleteRenovationWork,
  updateRenovationWork
} = require("../controllers/renovationController");


// STORAGE
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  }

});

const upload = multer({ storage });


// ROUTES

router.post(
  "/add",
  upload.array("images", 20),
  addRenovationWork
);

router.get("/", getRenovationWorks);

router.delete("/:id", deleteRenovationWork);

router.put(
  "/:id",
  upload.array("images", 20),
  updateRenovationWork
);

module.exports = router;