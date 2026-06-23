const express = require("express");

const router = express.Router();

const controller = require(
    "../controllers/electricalplumbingController"
);


// GET
router.get("/", controller.getAll);

// ADD
router.post("/", controller.create);

// UPDATE
router.put("/:id", controller.update);

// DELETE
router.delete("/:id", controller.remove);


module.exports = router;