const CivilWork = require("../models/civil");


// ARRAY FIX
const makeArray = (field) => {

  if (!field) return [];

  return Array.isArray(field)
    ? field
    : [field];
};



// ADD
exports.addCivilWork = async (req, res) => {

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


    const civil = new CivilWork({

      mainHeading,
mainDescription,
      sectionTitle,
      purpose,
      materialUsed,
      advantages,

      images: imagePaths,

      imageDetails

    });


    await civil.save();

    res.status(201).json({

      success: true,
      message: "Civil Work Added",
      civil

    });

  }

  catch (error) {

    res.status(500).json(error);

  }

};




// GET ALL
exports.getCivilWorks = async (req, res) => {

  try {

    const data =
    await CivilWork.find()
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
exports.deleteCivilWork = async (req, res) => {

  try {

    await CivilWork.findByIdAndDelete(
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
exports.updateCivilWork = async (req, res) => {

  try {
// for debug
    console.log("BODY:", req.body);
console.log("FILES:", req.files);

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
    await CivilWork.findById(req.params.id);


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
  else {

  updatedData.images = existing.images;

  const imageTitles =
    makeArray(req.body.imageTitles);

  const imageTexts =
    makeArray(req.body.imageTexts);

  updatedData.imageDetails =
    existing.images.map((img, index) => ({

      image: img,

      title:
        imageTitles[index] || "",

      text:
        imageTexts[index] || ""

    }));

}


  const updated =
await CivilWork.findByIdAndUpdate(
  req.params.id,
  updatedData,
  {
    returnDocument: "after"
  }
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