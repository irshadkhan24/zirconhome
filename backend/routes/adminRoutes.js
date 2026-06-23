const express = require("express");

const router = express.Router();

const {
  loginAdmin,
  forgetPassword,
  resetPassword
}
= require("../controllers/adminController");


router.post("/login", loginAdmin);

router.post(
  "/forgetpassword",
  forgetPassword
);

router.post(
  "/resetpassword/:token",
  resetPassword
);

module.exports = router;