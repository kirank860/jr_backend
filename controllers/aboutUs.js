const { default: mongoose } = require("mongoose");
const AboutUs = require("../models/aboutUs");
const upload = require("../middleware/multer");

const allowed_file_size = 2;
const DIR = "./uploads/aboutus";
const imageType = "image";

// @desc      create AboutUs
// @route     POST /api/v1/about-us
// @access    public
exports.createAboutUs = async (req, res, next) => {
  try {
    const multerUpload = upload(DIR, imageType);
    multerUpload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      const url = req.protocol + "://" + req.get("host");

      // Create the aboutus object
      const aboutUs = {
        title: req.body.title,
        subTitle: req.body.subTitle,
        description: req.body.description,
        image: url + "/images/" + req.file.filename,
        history: req.body.history,
        vision: req.body.vision,
        // image: url + "/images/" + req.file.filename,
        mission: req.body.mission,
        // image: url + "/images/" + req.file.filename,
        featuresList: req.body.featuresList,
        // image: url + "/images/" + req.file.filename,
        // franchise: req.body.franchise,
      };

      if (req.file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          success: false,
          message: "Image too large",
        });
      }

      // Save the aboutus
      const newAboutUs = await AboutUs.create(aboutUs);

      res.status(201).json({
        success: true,
        message: "AboutUs added successfully",
        data: newAboutUs,
      });
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// @desc      get AboutUs
// @route     GET /api/v1/about-us
// @access    public
exports.getAboutUs = async (req, res) => {
  try {
    const { id, skip, limit, searchkey } = req.query;
    if (id && mongoose.isValidObjectId(id)) {
      const response = await AboutUs.findById(id);
      return res.status(200).json({
        success: true,
        message: `retrieved specific AboutUs`,
        response,
      });
    }
    const query = searchkey
      ? { ...req.filter, title: { $regex: searchkey, $options: "i" } }
      : req.filter;
    const [totalCount, filterCount, data] = await Promise.all([
      parseInt(skip) === 0 && AboutUs.countDocuments(),
      parseInt(skip) === 0 && AboutUs.countDocuments(query),
      AboutUs.find(query)
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 10),
    ]);
    res.status(200).json({
      success: true,
      message: `retrieved all AboutUs`,
      response: data,
      count: data.length,
      totalCount: totalCount || 0,
      filterCount: filterCount || 0,
    });
  } catch (err) {
    console.log(err);
    res.status(204).json({
      success: false,
      message: err.toString(),
    });
  }
};

// @desc      update AboutUs
// @route     PUT /api/v1/about-us
// @access    public
exports.updateAboutUs = async (req, res) => {
  try {
    const multerUpload = upload(DIR, imageType);
    multerUpload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err.message,
        });
      }

      const { file, body, query } = req;
      const { id } = query;
      const url = req.protocol + "://" + req.get("host");

      if (file && file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          message: "Image file is too large",
        });
      }

      

      const updateFields = {
        title: body.title,
        subTitle: body.subTitle,
        description: body.description,
        image: file ? url + "/images/" + file.filename : undefined,
        history: body.history,
        vision: body.vision,
        // image: url + "/images/" + file.filename,
        mission: body.mission,
        // image: url + "/images/" + file.filename,
        featuresList: body.featuresList,
        // image: url + "/images/" + file.filename,
        // franchise: body.franchise,
      };

      if (file && file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          success: false,
          message: "Image file too large",
        });
      }

      const response = await AboutUs.findByIdAndUpdate(id, updateFields);

      res.status(201).json({
        message: "Successfully updated",
        data: response,
      });
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};

// @desc      delete AboutUs
// @route     DELETE /api/v1/about-us
// @access    public
exports.deleteAboutUs = async (req, res) => {
  try {
    const aboutus = await AboutUs.findByIdAndDelete(req.query.id);

    if (!aboutus) {
      return res.status(404).json({
        success: false,
        message: "About us not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "About us deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};
