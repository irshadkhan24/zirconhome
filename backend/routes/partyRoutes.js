const express = require("express")
const router = express.Router()

const upload = require("../middleware/uploadMiddleware")

const {
  getParties,
  addParty,
  updateParty,
  deleteParty
} = require("../controllers/partyController")

router.get("/", getParties)
router.post("/", upload.single("logo"), addParty)
router.put("/:id", upload.single("logo"), updateParty)
router.delete("/:id", deleteParty)

module.exports = router