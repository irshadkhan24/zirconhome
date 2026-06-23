const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  heading: String,
  subheading: String,
  title: String,

  companyName: String,
  address: String,
  phone: String,
  email: String,
  timing: String,
  whatsapp: String,
  mapLink: String
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);