const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  designation: {
    type: String
  },
  company: {
    type: String
  },
  projectName: {
    type: String
  },
  location: {
    type: String
  },
  year: {
    type: Number
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  message: {
    type: String,
    required: true
  },
  image: {
    type: String // store image URL
  },
  featured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Testimonial", testimonialSchema);