const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const {
  addPlumbingWork,
  getPlumbingWorks,
  deletePlumbingWork,
  updatePlumbingWork
} = require("../controllers/plumbingController");


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
  addPlumbingWork
);

router.get("/", getPlumbingWorks);

router.delete("/:id", deletePlumbingWork);

router.put(
  "/:id",
  upload.array("images", 20),
  updatePlumbingWork
);

module.exports = router;