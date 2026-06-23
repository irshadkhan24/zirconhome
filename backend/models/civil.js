const mongoose = require("mongoose");

const imageDetailSchema = new mongoose.Schema({
  image: String,
  title: String,
  text: String
});

const civilWorkSchema = new mongoose.Schema({
  mainHeading: String,
  mainDescription: String,
  sectionTitle: {
    type: String,
    required: true
  },

  purpose: {
    type: String,
    required: true
  },

  materialUsed: {
    type: String,
    required: true
  },

  advantages: {
    type: String,
    required: true
  },

  images: [String],

  imageDetails: [imageDetailSchema]

}, { timestamps: true });

module.exports = mongoose.model("CivilWork", civilWorkSchema);