const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({

  section: {
    type: String,
    required: true
  },

  title: String,

  description: String,

  image: String,

  icon: String,

  stats: [
    {
      title: String,
      value: String
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("About", aboutSchema);