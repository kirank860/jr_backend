const { default: mongoose } = require("mongoose");
const OurClient = require("../models/ourClient");
const upload = require("../middleware/multer");

const allowed_file_size = 2;
const DIR = "./uploads/ourclient";
const imageType = "image";

// @desc      create OurClient
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

      // Create the OurClient object
      const ourclient = {
        clientLogo: req.body.clientLogo,
        url: req.body.url,
        // franchise: req.body.franchise,
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
        message: "Our clients added successfully",
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


// @desc      get OurClient
// @route     GET /api/v1/our-client
// @access    public
exports.getOurClient = async (req, res) => {
  try {
    const { id, skip, limit, searchkey } = req.query;
    if (id && mongoose.isValidObjectId(id)) {
      const response = await OurClient.findById(id);
      return res.status(200).json({
        success: true,
        message: `retrieved specific Our clients`,
        response,
      });
    }
    const query = searchkey
      ? { ...req.filter, clientLogo: { $regex: searchkey, $options: "i" } }
      : req.filter;
    const [totalCount, filterCount, data] = await Promise.all([
      parseInt(skip) === 0 && OurClient.countDocuments(),
      parseInt(skip) === 0 && OurClient.countDocuments(query),
      OurClient.find(query)
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 10),
    ]);
    res.status(200).json({
      success: true,
      message: `retrieved all Our clients`,
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

// @desc      update OurClient
// @route     PUT /api/v1/our-client
// @access    public
exports.updateOurClient = async (req, res) => {
  try {

      const { id } = query;

      
      const updateFields = {
        clientLogo: body.clientLogo,
        url: body.url,
        // franchise: body.franchise,
      };

      const OurClient = await OurClient.findByIdAndUpdate(id, updateFields);

      res.status(201).json({
        message: "Successfully updated OurClients",
        data: OurClient,
      });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};

// @desc      delete OurClient
// @route     DELETE /api/v1/our-client
// @access    public
exports.deleteOurClient = async (req, res) => {
  try {
    const OurClient = await OurClient.findByIdAndDelete(req.query.id);

    if (!OurClient) {
      return res.status(404).json({
        success: false,
        message: "OurClients not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "OurClients deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};
