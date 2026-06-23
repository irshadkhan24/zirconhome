const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const {
  addCivilWork,
  getCivilWorks,
  deleteCivilWork,
  updateCivilWork
} = require("../controllers/civilController");


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
  addCivilWork
);

router.get("/", getCivilWorks);

router.delete("/:id", deleteCivilWork);

router.put(
  "/:id",
  upload.array("images", 20),
  updateCivilWork
);

module.exports = router;