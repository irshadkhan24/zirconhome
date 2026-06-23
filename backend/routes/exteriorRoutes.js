const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const {
  addExteriorWork,
  getExteriorWorks,
  deleteExteriorWork,
  updateExteriorWork
} = require("../controllers/exteriorController");


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
  addExteriorWork
);

router.get("/", getExteriorWorks);

router.delete("/:id", deleteExteriorWork);

router.put(
  "/:id",
  upload.array("images", 20),
  updateExteriorWork
);

module.exports = router;