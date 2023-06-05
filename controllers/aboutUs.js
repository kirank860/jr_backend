const { default: mongoose } = require("mongoose");
const AboutUs = require("../models/aboutUs");
const upload = require("../middleware/multer");

const allowed_file_size = 2;
const DIR = "./uploads/aboutus";
const imageType = "image";

// @desc      CREATE ABOUTUS
// @route     POST /api/v1/about-us
// @access    private
exports.createAboutUs = async (req, res) => {
  try {
    // console.log(req.body)
    const newAboutUs = await AboutUs.create(req.body);
    res.status(201).json({
      success: true,
      message: "About us created successfully",
      data: newAboutUs,
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// @desc      GET ABOUTUS
// @route     GET /api/v1/about-us
// @access    private
exports.getAboutUs = async (req, res) => {
  try {
    const { id, skip, limit, searchkey } = req.query;
    if (id && mongoose.isValidObjectId(id)) {
      const response = await AboutUs.findById(id).populate("franchise");
      return res.status(200).json({
        success: true,
        message: `Retrieved specific about us`,
        response,
      });
    }
    // const query = searchkey
    //   ? { ...req.filter, title: { $regex: searchkey, $options: "i" } }
    //   : req.filter;
    const query = {
      ...req.filter,
      ...(searchkey && {
        $or: [
          { title: { $regex: searchkey, $options: "i" } },
          { subTitle: { $regex: searchkey, $options: "i" } },
        ],
      }),
    };

    const [totalCount, filterCount, data] = await Promise.all([
      parseInt(skip) === 0 && AboutUs.countDocuments(),
      parseInt(skip) === 0 && AboutUs.countDocuments(query),
      AboutUs.find(query).populate("franchise")
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 50),
    ]);
    res.status(200).json({
      success: true,
      message: `Retrieved all about us`,
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

// @desc      UPDATE ABOUTUS
// @route     PUT /api/v1/about-us
// @access    private
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
        pageTitle: body.pageTitle,
        pageSubTitle: body.pageSubTitle,
        bannerImage: file ? url + "/images/" + file.filename : undefined,
        title: body.title,
        subTitle: body.subTitle,
        description: body.description,
        aboutusImage: file ? url + "/images/" + file.filename : undefined,
        history: body.history,
        vision: body.vision,
        visionImage: file ? url + "/images/" + file.filename : undefined,
        mission: body.mission,
        missionImage: file ? url + "/images/" + file.filename : undefined,
        featuresList: body.featuresList,
        featuresImage: file ? url + "/images/" + file.filename : undefined,
        franchise: body.franchise,
      };

      if (file && file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          success: false,
          message: "Image file too large",
        });
      }

      const response = await AboutUs.findByIdAndUpdate(body.id, updateFields);

      res.status(201).json({
        message: "Successfully updated about us",
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

// @desc      DELETE ABOUTUS
// @route     DELETE /api/v1/about-us
// @access    private
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

// @desc      GET BY FRANCHISE
// @route     GET /api/v1/about-us/get-by-aboutus
// @access    private
exports.getByFranchise = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await AboutUs.find({ franchise: id });

    res.status(201).json({
      message: "Successfully retrieved",
      data: response,
    });

  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};