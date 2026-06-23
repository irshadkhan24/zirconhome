const Testimonial = require("../models/testimonial");

// ADD
exports.addTestimonial = async (req, res) => {
  try {

    const newData = {
      ...req.body,
      image: req.file ? "/uploads/" + req.file.filename : ""
    };

    const testimonial = await Testimonial.create(newData);

    res.json({
      message: "Added Successfully",
      testimonial
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding testimonial" });
  }
};

// GET ALL
exports.getTestimonials = async (req, res) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  res.json(testimonials);
};

// UPDATE
exports.updateTestimonial = async (req, res) => {
  try {

    const updateData = {
      ...req.body
    };

    if (req.file) {
      updateData.image = "/uploads/" + req.file.filename;
    }

    await Testimonial.findByIdAndUpdate(req.params.id, updateData);

    res.json({ message: "Updated Successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error updating testimonial" });
  }
};

// DELETE
exports.deleteTestimonial = async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted Successfully" });
};