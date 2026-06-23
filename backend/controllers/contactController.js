const Contact = require("../models/contact");

exports.getContacts = async (req, res) => {
  const data = await Contact.find().sort({ createdAt: -1 });
  res.json(data);
};

exports.addContact = async (req, res) => {
  const newData = new Contact(req.body);
  await newData.save();
  res.json({ message: "Added" });
};

exports.updateContact = async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Updated" });
};

exports.deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};