const { default: mongoose } = require("mongoose");
const TermsOfService = require("../models/termsOfService");

// @desc      create Terms of service
// @route     POST /api/v1/termsof-service
// @access    public
exports.createTermsOfService = async (req, res, next) => {
  try {
    // Create the TermsOfService object
    const termsOfService = {
      title: req.body.title,
      description: req.body.description,
      franchise: req.body.franchise,
    };

    // Save the TermsOfService
    const newTermsOfService = (await TermsOfService.create(termsOfService));

    res.status(201).json({
      success: true,
      message: "Terms of service added successfully",
      data: newTermsOfService,
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// @desc      get Terms of service
// @route     GET /api/v1/termsof-service
// @access    public
exports.getTermsOfService = async (req, res) => {
  try {
    const { id, skip, limit, searchkey } = req.query;
    if (id && mongoose.isValidObjectId(id)) {
      const response = await TermsOfService.findById(id).populate("franchise");
      return res.status(200).json({
        success: true,
        message: `Retrieved specific terms of service`,
        response,
      });
    }
    const query = searchkey
      ? { ...req.filter, title: { $regex: searchkey, $options: "i" } }
      : req.filter;
    const [totalCount, filterCount, data] = await Promise.all([
      parseInt(skip) === 0 && TermsOfService.countDocuments(),
      parseInt(skip) === 0 && TermsOfService.countDocuments(query),
      TermsOfService.find(query).populate("franchise")
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 50),
    ]);
    res.status(200).json({
      success: true,
      message: `Retrieved all terms of service`,
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

// @desc      UPDATE TERMS OF SERVICE
// @route     PUT /api/v1/termsof-service
// @access    public
exports.updateTermsOfService = async (req, res) => {
  try {
    const { body, query } = req;
    const { id } = query;

    const updateFields = {
      title: body.title,
      description: body.description,
      franchise: body.franchise,
    };

    const response = await TermsOfService.findByIdAndUpdate(id, updateFields);

    res.status(201).json({
      message: "Successfully updated",
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

// @desc      DELETE TERMS OF SERVICE
// @route     DELETE /api/v1/termsof-service
// @access    public
exports.deleteTermsOfService = async (req, res) => {
  try {
    const termsOfService = await TermsOfService.findByIdAndDelete(req.query.id);

    if (!termsOfService) {
      return res.status(404).json({
        success: false,
        message: "Terms of service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Terms of service deleted successfully",
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
// @route     GET /api/v1/termsof-service/get-by-termsofservice
// @access    public
exports.getByFranchise = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await TermsOfService.find({ franchise: id });

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