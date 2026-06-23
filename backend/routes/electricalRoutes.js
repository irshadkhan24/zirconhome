const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const {
  addElectricalWork,
  getElectricalWorks,
  deleteElectricalWork,
  updateElectricalWork
} = require("../controllers/electricalController");


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
  addElectricalWork
);

router.get("/", getElectricalWorks);

router.delete("/:id", deleteElectricalWork);

router.put(
  "/:id",
  upload.array("images", 20),
  updateElectricalWork
);

module.exports = router;