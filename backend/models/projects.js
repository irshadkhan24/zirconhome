const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({

  heroTitle: {
    type: String,
    default: "Our Projects"
  },

  heroDescription: {
    type: String,
    default: ""
  },

  completeBtn: {
    type: String,
    default: "Complete Projects"
  },

  ongoingBtn: {
    type: String,
    default: "Ongoing Projects"
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);