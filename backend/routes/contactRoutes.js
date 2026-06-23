const express = require("express");
const {
  getContacts,
  addContact,
  updateContact,
  deleteContact
} = require("../controllers/contactController");

const verifyAdmin = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getContacts);
router.post("/", verifyAdmin, addContact);
router.put("/:id", verifyAdmin, updateContact);
router.delete("/:id", verifyAdmin, deleteContact);

module.exports = router;