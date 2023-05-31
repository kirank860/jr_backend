const { default: mongoose } = require("mongoose");
const OurClient = require("../models/ourClient");
const upload = require("../middleware/multer");

const allowed_file_size = 2;
const DIR = "./uploads/ourclient";
const imageType = "clientLogo";

// @desc      CREATE OUR CLIENT
// @route     POST /api/v1/our-client
// @access    public
exports.createOurClient = async (req, res, next) => {
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

      // Create the Our Client object
      const ourclient = {
        clientLogo: url + "/images/" + req.file.filename,
        clientUrl: req.body.clientUrl,
        franchise: req.body.franchise,
      };

      if (req.file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          success: false,
          message: "Image too large",
        });
      }

      // Save the OurClient
      const newOurClient = await OurClient.create(ourclient);

      res.status(201).json({
        success: true,
        message: "Our client created successfully",
        data: newOurClient,
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


// @desc      GET OUR CLIENT
// @route     GET /api/v1/our-client
// @access    public
exports.getOurClient = async (req, res) => {
  try {
    const { id, skip, limit, searchkey } = req.query;
    if (id && mongoose.isValidObjectId(id)) {
      const response = await OurClient.findById(id).populate("franchise");
      return res.status(200).json({
        success: true,
        message: `Retrieved our client`,
        response,
      });
    }
    const query = searchkey
      ? { ...req.filter, clientUrl: { $regex: searchkey, $options: "i" } }
      : req.filter;
    const [totalCount, filterCount, data] = await Promise.all([
      parseInt(skip) === 0 && OurClient.countDocuments(),
      parseInt(skip) === 0 && OurClient.countDocuments(query),
      OurClient.find(query).populate("franchise")
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 50),
    ]);
    res.status(200).json({
      success: true,
      message: `Retrieved all our client`,
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

// @desc      UPDATE OUR CLIENT
// @route     PUT /api/v1/our-client
// @access    public
exports.updateOurClient = async (req, res) => {
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
        clientLogo: file ? url + "/images/" + file.filename : undefined,
        clientUrl: body.clientUrl,
        franchise: body.franchise,
      };

      if (file && file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          success: false,
          message: "Image file too large",
        });
      }

      const response = await OurClient.findByIdAndUpdate(id, updateFields);

      res.status(201).json({
        message: "Successfully updated our client",
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

// @desc      DELETE OUR CLIENT
// @route     DELETE /api/v1/our-client
// @access    public
exports.deleteOurClient = async (req, res) => {
  try {
    const ourclient = await OurClient.findByIdAndDelete(req.query.id);

    if (!ourclient) {
      return res.status(404).json({
        success: false,
        message: "Our client not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Our client deleted successfully",
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
// @route     GET /api/v1/our-client/get-by-ourclient
// @access    public
exports.getByFranchise = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await OurClient.find({ franchise: id });

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
