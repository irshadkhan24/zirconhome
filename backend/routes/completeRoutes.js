const express = require("express");

const router = express.Router();

const multer = require("multer");

const {

  addProject,
  getProjects,
  updateProject,
  deleteProject

} = require("../controllers/completeController");


// STORAGE

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");

  },

  filename: (req, file, cb) => {

    cb(null,
    Date.now() + "-" + file.originalname);

  }

});

const upload = multer({ storage });


// ROUTES

router.post(
  "/",
  upload.single("image"),
  addProject
);

router.get("/", getProjects);

router.put(
  "/:id",
  upload.single("image"),
  updateProject
);

router.delete("/:id", deleteProject);

module.exports = router;