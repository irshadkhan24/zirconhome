const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String,
  link: String,
  buttonText: String
});

const servicePageSchema = new mongoose.Schema({
  heroTitle: String,
  heroSubtitle: String,
  introTitle: String,
  introDescription: String,
  services: [serviceSchema],
  whyChoose: [String]
});

module.exports = mongoose.model(
  "service",
  servicePageSchema
);