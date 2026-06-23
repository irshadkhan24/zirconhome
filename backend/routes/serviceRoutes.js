const express = require("express");

const router = express.Router();

const {
  getPage,
  updatePage
} = require("../controllers/serviceController");


// GET
router.get("/", getPage);


// UPDATE
router.put("/", updatePage);


module.exports = router;