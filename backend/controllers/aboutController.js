const About = require("../models/about");

// ADD
exports.addAbout = async (req, res) => {
  try {
    const data = {
      ...req.body,
      image: req.file ? "/uploads/" + req.file.filename : ""
    };

    const result = await About.create(data);

    res.json({ message: "Added", result });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
};

// GET
exports.getAbout = async (req, res) => {
  const data = await About.find().sort({ createdAt: -1 });
  res.json(data);
};

// UPDATE
exports.updateAbout = async (req, res) => {
  try {

    let updateData = {
      ...req.body
    };

    if (req.file) {
      updateData.image =
        "/uploads/" + req.file.filename;
    }

    const updated = await About.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      message: "Updated",
      updated
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Error updating"
    });

  }
};

// DELETE
exports.deleteAbout = async (req, res) => {
  await About.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};