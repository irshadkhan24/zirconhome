const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const {
  addInteriorWork,
  getInteriorWorks,
  deleteInteriorWork,
  updateInteriorWork
} = require("../controllers/interiorController");


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
  addInteriorWork
);

router.get("/", getInteriorWorks);

router.delete("/:id", deleteInteriorWork);

router.put(
  "/:id",
  upload.array("images", 20),
  updateInteriorWork
);

module.exports = router;