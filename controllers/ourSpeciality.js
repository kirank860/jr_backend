const { default: mongoose } = require("mongoose");
const OurSpeciality = require("../models/ourSpeciality");
const upload = require("../middleware/multer");

const allowed_file_size = 2;
const DIR = "./uploads/ourspeciality";
const imageType = "image";

// @desc      CREATE OUR SPECIALITY
// @route     POST /api/v1/our-speciality
// @access    private
exports.createOurSpeciality = async (req, res, next) => {
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

      // Create the OurSpeciality object
      const ourSpeciality = {
        title: req.body.title,
        subTitle: req.body.subTitle,
        description: req.body.description,
        image: url + "/images/" + req.file.filename,
        franchise: req.body.franchise,
      };

      if (req.file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          success: false,
          message: "Image too large",
        });
      }

      // Save the OurSpeciality
      const newOurSpeciality = await OurSpeciality.create(ourSpeciality);

      res.status(201).json({
        success: true,
        message: "Our specialities added successfully",
        data: newOurSpeciality,
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


// @desc      GET OUR SPECIALITY
// @route     GET /api/v1/our-speciality
// @access    private
exports.getOurSpeciality = async (req, res) => {
  try {
    const { id, skip, limit, searchkey } = req.query;
    if (id && mongoose.isValidObjectId(id)) {
      const response = await OurSpeciality.findById(id).populate("franchise");
      return res.status(200).json({
        success: true,
        message: `Retrieved specific our speciality`,
        response,
      });
    }
    const query = searchkey
      ? { ...req.filter, title: { $regex: searchkey, $options: "i" } }
      : req.filter;
    const [totalCount, filterCount, data] = await Promise.all([
      parseInt(skip) === 0 && OurSpeciality.countDocuments(),
      parseInt(skip) === 0 && OurSpeciality.countDocuments(query),
      OurSpeciality.find(query)
        .populate("franchise")
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 50),
    ]);
    res.status(200).json({
      success: true,
      message: `Retrieved all our speciality`,
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

// @desc      UPDATE OUR SPECIALITY
// @route     PUT /api/v1/our-speciality
// @access    private
exports.updateOurSpeciality = async (req, res) => {
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
        franchise: body.franchise,
      };

      if (file && file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          success: false,
          message: "Image file too large",
        });
      }

      const response = await OurSpeciality.findByIdAndUpdate(id, updateFields);

      res.status(201).json({
        message: "Successfully updated our speciality",
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

// @desc      DELETE OUR SPECIALITY
// @route     DELETE /api/v1/our-speciality
// @access    private
exports.deleteOurSpeciality = async (req, res) => {
  try {
    const ourSpeciality = await OurSpeciality.findByIdAndDelete(req.query.id);

    if (!ourSpeciality) {
      return res.status(404).json({
        success: false,
        message: "Our speciality not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Our speciality deleted successfully",
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
// @route     GET /api/v1/our-speciality/get-by-ourspeciality
// @access    private
exports.getByFranchise = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await OurSpeciality.find({ franchise: id });

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