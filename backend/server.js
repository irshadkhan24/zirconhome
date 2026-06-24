const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const Admin = require("./models/admin");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


// Routes
const adminRoutes = require("./routes/adminRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const partyRoutes = require("./routes/partyRoutes");
const contactRoutes = require("./routes/contactRoutes");
const projectRoutes = require("./routes/projectRoutes");
const completeRoutes = require("./routes/completeRoutes");
const ongoingRoutes = require("./routes/ongoingRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const civilRoutes = require("./routes/civilRoutes");
const interiorRoutes = require("./routes/interiorRoutes");
const exteriorRoutes = require("./routes/exteriorRoutes");
const renovationRoutes = require("./routes/renovationRoutes");
const electricalplumbingRoutes = require(
    "./routes/electricalplumbingRoutes"
);
const electricalRoutes = require("./routes/electricalRoutes");
const plumbingRoutes = require("./routes/plumbingRoutes");
const homeRoutes = require("./routes/homeRoutes");

app.use("/api/admin", adminRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/parties", partyRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/complete", completeRoutes);
app.use("/api/ongoing", ongoingRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/civil", civilRoutes);
app.use("/api/interior", interiorRoutes);
app.use("/api/exterior", exteriorRoutes);
app.use("/api/renovation", renovationRoutes);
app.use("/api/electricalplumbing", electricalplumbingRoutes);
app.use("/api/electrical", electricalRoutes);
app.use("/api/plumbing", plumbingRoutes);
app.use("/api/home", homeRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)

.then(async () => {

  console.log("MongoDB Connected");

  const existingAdmin = await Admin.findOne({
    email: "zirconhome27@gmail.com"
  });

if (!existingAdmin) {

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await Admin.create({
    email: "zirconhome27@gmail.com",
    password: hashedPassword
  });

  console.log("Default Admin Created");  
}

})

.catch(err => console.log(err));


// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});


// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});