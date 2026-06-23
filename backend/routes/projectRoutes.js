const express = require("express");

const router = express.Router();

const {
  addProject,
  getProjects,
  updateProject,
  deleteProject
} = require("../controllers/projectController");


// ADD
router.post("/", addProject);

// GET
router.get("/", getProjects);

// UPDATE
router.put("/:id", updateProject);

// DELETE
router.delete("/:id", deleteProject);

module.exports = router;