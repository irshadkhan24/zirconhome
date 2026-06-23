const mongoose = require("mongoose");

const ongoingSchema = new mongoose.Schema({

  title: String,
  location: String,
  details: String,
  works: String,
  cost: String,
  image: String,
  status: String

});

module.exports =
mongoose.model("Ongoing", ongoingSchema);