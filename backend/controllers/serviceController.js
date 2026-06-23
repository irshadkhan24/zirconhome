const Service = require("../models/service");


// GET PAGE
exports.getPage = async (req, res) => {

  try {

    let page = await Service.findOne();

    // DEFAULT DATA
    if (!page) {

      page = await Service.create({

        heroTitle: "Our Services",

        heroSubtitle:
          "We provide high-quality services for every construction and renovation project.",

        introTitle:
          "Our Expertise in Construction Services",

        introDescription:
          "At Zircon Home, we provide complete construction and renovation solutions.",

        services: [],

        whyChoose: []

      });

    }

    res.json(page);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// UPDATE PAGE
exports.updatePage = async (req, res) => {

  try {

    let page = await Service.findOne();

    // UPDATE EXISTING
    if (page) {

      page = await Service.findByIdAndUpdate(

        page._id,

        req.body,

        { new: true }

      );

    }

    // CREATE NEW
    else {

      page = await Service.create(req.body);

    }

    res.json(page);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Update Error"
    });

  }

};