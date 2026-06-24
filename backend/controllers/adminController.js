const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");


// LOGIN
exports.loginAdmin = async (req, res) => {

  try {

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        message: "Invalid Email"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// FORGOT PASSWORD
exports.forgetPassword = async (req, res) => {

  try {

    const { email } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        message: "Email not found"
      });
    }

    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    admin.resetToken = resetToken;

    admin.resetTokenExpire =
      Date.now() + 15 * 60 * 1000;

    await admin.save();

    const resetURL =
      `https://zirconhome.onrender.com/resetpassword.html?token=${resetToken}`;

 const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  connectionTimeout: 10000
});

   await transporter.verify();

await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: admin.email,

      subject: "Password Reset",

      html: `
        <h2>Password Reset</h2>

        <p>Click below link:</p>

        <a href="${resetURL}">
          Reset Password
        </a>
      `
    });

    res.json({
      message: "Reset link sent to email"
    });

  } 
    catch (error) {
  console.log(" FORGOT PASSWORD ERROR:", error);
  res.status(500).json({
    message: "Server Error"
  });
}

};


// RESET PASSWORD
exports.resetPassword = async (req, res) => {

  try {

    const { token } = req.params;

    const { password } = req.body;

    const admin = await Admin.findOne({

      resetToken: token,

      resetTokenExpire: {
        $gt: Date.now()
      }

    });

    if (!admin) {
      return res.status(400).json({
        message: "Invalid or Expired Token"
      });
    }

    admin.password = password;

    admin.resetToken = undefined;

    admin.resetTokenExpire = undefined;

    await admin.save();

    res.json({
      message: "Password Reset Successful"
    });

  } 
  catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

};


