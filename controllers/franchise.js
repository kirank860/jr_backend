const { default: mongoose } = require("mongoose");
const Franchise = require("../models/franchise");
const upload = require("../middleware/multer");

const allowed_file_size = 2;
const DIR = "./uploads/franchise";
const imageType = "logo";

// @desc      CREATE NEW FRANCHISE
// @route     POST /api/v1/franchises
// @access    private
exports.createFranchise = async (req, res) => {
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

      // Create the franchise object
      const franchise = {
        name: req.body.name,
        location: req.body.location,
        website: req.body.website,
        email: req.body.email,
        phone: req.body.phone,
        description: req.body.description,
        logo: url + "/images/" + req.file.filename,
        primaryColour: req.body.primaryColour,
        secondaryColour: req.body.secondaryColour,
      };

      if (req.file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          success: false,
          message: "Logo file too large",
        });
      }

      // Save the franchise
      const newFranchise = await Franchise.create(franchise);

      res.status(201).json({
        success: true,
        message: "Franchise created successfully",
        data: newFranchise,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// @desc      GET FRANCHISE
// @route     GET /api/v1/franchises/:id
// @access    private
exports.getFranchise = async (req, res) => {
  try {
    const { id, skip, limit, searchkey } = req.query;
    if (id && mongoose.isValidObjectId(id)) {
      const response = await Franchise.findById(id);
      return res.status(200).json({
        success: true,
        message: `retrieved specific Franchise`,
        response,
      });
    }
    const query = searchkey
      ? { ...req.filter, name: { $regex: searchkey, $options: "i" } }
      : req.filter;
    const [totalCount, filterCount, data] = await Promise.all([
      parseInt(skip) === 0 && Franchise.countDocuments(),
      parseInt(skip) === 0 && Franchise.countDocuments(query),
      Franchise.find(query)
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 50),
    ]);
    res.status(200).json({
      success: true,
      message: `retrieved all Franchise`,
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

// @desc      UPDATE SPECIFIC FRANCHISE
// @route     PUT /api/v1/franchises/:id
// @access    private
exports.updateFranchise = async (req, res) => {
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
        name: body.name,
        location: body.location,
        website: body.website,
        email: body.email,
        phone: body.phone,
        description: body.description,
        logo: file ? url + "/images/" + file.filename : undefined,
        primaryColour: body.primaryColour,
        secondaryColour: body.secondaryColour,
      };

      if (file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          success: false,
          message: "Image file too large",
        });
      }

      const response = await Franchise.findByIdAndUpdate(id, updateFields);

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

// @desc      DELETE SPECIFIC FRANCHISE
// @route     DELETE /api/v1/franchises/:id
// @access    private
exports.deleteFranchise = async (req, res) => {
  try {
    const franchise = await Franchise.findByIdAndDelete(req.query.id);

    if (!franchise) {
      return res.status(404).json({
        success: false,
        message: "Franchise not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Franchise deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};
