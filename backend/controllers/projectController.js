const Project = require("../models/projects");


// ================= ADD =================

exports.addProject = async (req, res) => {
  try {

    const newProject = new Project(req.body);

    await newProject.save();

    res.status(201).json({
      success: true,
      message: "Project Added",
      project: newProject
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


// ================= GET =================

exports.getProjects = async (req, res) => {

  try {

    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json(projects);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};


// ================= UPDATE =================

exports.updateProject = async (req, res) => {

  try {

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};


// ================= DELETE =================

exports.deleteProject = async (req, res) => {

  try {

    await Project.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted Successfully"
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};