const Ongoing = require("../models/ongoing");


// ================= ADD =================

exports.addProject = async (req, res) => {

  try {

    const newProject = new Ongoing({

      title: req.body.title,
      location: req.body.location,
      details: req.body.details,
      works: req.body.works,
      cost: req.body.cost,
      status: req.body.status,

      image: req.file
        ? req.file.filename
        : ""

    });

    await newProject.save();

    res.json(newProject);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ================= GET =================

exports.getProjects = async (req, res) => {

  try {

    const projects = await Ongoing.find();

    res.json(projects);

  } catch (err) {

    res.status(500).json(err);

  }

};


// ================= UPDATE =================

exports.updateProject = async (req, res) => {

  try {

    const updatedData = {

      title: req.body.title,
      location: req.body.location,
      details: req.body.details,
      works: req.body.works,
      cost: req.body.cost,
      status: req.body.status

    };

    if (req.file) {

      updatedData.image =
      req.file.filename;

    }

    await Ongoing.findByIdAndUpdate(
      req.params.id,
      updatedData
    );

    res.json({
      message: "Updated Successfully"
    });

  } catch (err) {

    res.status(500).json(err);

  }

};


// ================= DELETE =================

exports.deleteProject = async (req, res) => {

  try {

    await Ongoing.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted Successfully"
    });

  } catch (err) {

    res.status(500).json(err);

  }

};