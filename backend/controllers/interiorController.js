const InteriorWork = require("../models/interior");


// ARRAY FIX
const makeArray = (field) => {

  if (!field) return [];

  return Array.isArray(field)
    ? field
    : [field];
};



// ADD
exports.addInteriorWork = async (req, res) => {

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


    const interior = new InteriorWork({

      mainHeading,
mainDescription,
      sectionTitle,
      purpose,
      materialUsed,
      advantages,

      images: imagePaths,

      imageDetails

    });


    await interior.save();

    res.status(201).json({

      success: true,
      message: "interior Work Added",
      interior

    });

  }

  catch (error) {

    res.status(500).json(error);

  }

};






// GET ALL
exports.getInteriorWorks = async (req, res) => {

  try {

    const data =
    await InteriorWork.find()
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
exports.deleteInteriorWork = async (req, res) => {

  try {

    await InteriorWork.findByIdAndDelete(
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
exports.updateInteriorWork = async (req, res) => {

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
    await InteriorWork.findById(req.params.id);


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
    // New Chanegs for all edit and save 
   else {

  updatedData.images = existing.images;

  const imageTitles =
    makeArray(req.body.imageTitles);

  const imageTexts =
    makeArray(req.body.imageTexts);

  updatedData.imageDetails =
    existing.images.map((img, index) => ({
      image: img,
      title: imageTitles[index] || "",
      text: imageTexts[index] || ""
    }));

}

// New Chanegs for all edit and save 
  const updated =
await InteriorWork.findByIdAndUpdate(
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