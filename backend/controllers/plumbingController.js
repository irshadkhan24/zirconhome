const PlumbingWork = require("../models/plumbing");


// ARRAY FIX
const makeArray = (field) => {

  if (!field) return [];

  return Array.isArray(field)
    ? field
    : [field];
};



// ADD
exports.addPlumbingWork = async (req, res) => {

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


    const plumbing = new PlumbingWork({

      mainHeading,
mainDescription,
      sectionTitle,
      purpose,
      materialUsed,
      advantages,

      images: imagePaths,

      imageDetails

    });


    await plumbing.save();

    res.status(201).json({

      success: true,
      message: "plumbing Work Added",
      plumbing

    });

  }

  catch (error) {

    res.status(500).json(error);

  }

};




// GET ALL
exports.getPlumbingWorks = async (req, res) => {

  try {

    const data =
    await PlumbingWork.find()
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
exports.deletePlumbingWork = async (req, res) => {

  try {

    await PlumbingWork.findByIdAndDelete(
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
exports.updatePlumbingWork = async (req, res) => {

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
    await PlumbingWork.findById(req.params.id);


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
    await PlumbingWork.findByIdAndUpdate(

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