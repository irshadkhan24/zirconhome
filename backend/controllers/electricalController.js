const ElectricalWork = require("../models/electrical");


// ARRAY FIX
const makeArray = (field) => {

  if (!field) return [];

  return Array.isArray(field)
    ? field
    : [field];
};



// ADD
exports.addElectricalWork = async (req, res) => {

  try {

 const {
  mainHeading,
  mainDescription,
  sectionTitle,
  purpose,
  materialUsed,
  advantages
} = req.body;


    const imageTitles =
    makeArray(req.body.imageTitles);

    const imageTexts =
    makeArray(req.body.imageTexts);


    const imagePaths =
    req.files.map(file => {

      return `/uploads/${file.filename}`;

    });


    const imageDetails =
    imagePaths.map((img, index) => ({

      image: img,

      title:
      imageTitles[index] || "",

      text:
      imageTexts[index] || ""

    }));


    const electrical = new ElectricalWork({

      mainHeading,
mainDescription,
      sectionTitle,
      purpose,
      materialUsed,
      advantages,

      images: imagePaths,

      imageDetails

    });


    await electrical.save();

    res.status(201).json({

      success: true,
      message: "electrical Work Added",
      electrical

    });

  }

  catch (error) {

    res.status(500).json(error);

  }

};




// GET ALL
exports.getElectricalWorks = async (req, res) => {

  try {

    const data =
    await ElectricalWork.find()
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      data
    });

  }

  catch (error) {

    res.status(500).json(error);

  }

};




// DELETE
exports.deleteElectricalWork = async (req, res) => {

  try {

    await ElectricalWork.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Deleted Successfully"
    });

  }

  catch (error) {

    res.status(500).json(error);

  }

};





// UPDATE
exports.updateElectricalWork = async (req, res) => {

  try {

    const {
      mainHeading,
      mainDescription,
      sectionTitle,
      purpose,
      materialUsed,
      advantages
    } = req.body;


    const updatedData = {

      mainHeading,
      mainDescription,
      sectionTitle,
      purpose,
      materialUsed,
      advantages

    };


    const existing =
    await ElectricalWork.findById(req.params.id);


    // NEW IMAGE UPLOAD KIYA
    if(req.files && req.files.length > 0){

      const imageTitles =
      makeArray(req.body.imageTitles);

      const imageTexts =
      makeArray(req.body.imageTexts);


      const imagePaths =
      req.files.map(file => {

        return `/uploads/${file.filename}`;

      });


      updatedData.images = imagePaths;


      updatedData.imageDetails =
      imagePaths.map((img, index) => ({

        image: img,

        title:
        imageTitles[index] || "",

        text:
        imageTexts[index] || ""

      }));

    }

    // AGAR NEW IMAGE NAHI DIYA
    else{

      updatedData.images =
      existing.images;

      updatedData.imageDetails =
      existing.imageDetails;

    }


    const updated =
    await ElectricalWork.findByIdAndUpdate(

      req.params.id,

      updatedData,

      { new:true }

    );


    res.json({

      success:true,
      updated

    });

  }

  catch(error){

    res.status(500).json(error);

  }

};