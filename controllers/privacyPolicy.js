const { default: mongoose } = require("mongoose");
const PrivacyPolicy = require("../models/privacyPolicy");

// @desc      CREATE PRIVACY POLICY
// @route     POST /api/v1/privacy-policy
// @access    public
exports.createPrivacyPolicy = async (req, res, next) => {
  try {
    // Create the PrivacyPolicy object
    const privacyPolicy = {
      title: req.body.title,
      description: req.body.description,
      franchise: req.body.franchise,
    };

    // Save the PrivacyPolicy
    const newPrivacyPolicy = (await PrivacyPolicy.create(privacyPolicy));

    res.status(201).json({
      success: true,
      message: "Privacy policy added successfully",
      data: newPrivacyPolicy,
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// @desc      GET PRIVACY POLICY
// @route     GET /api/v1/privacy-policy
// @access    public
exports.getPrivacyPolicy = async (req, res) => {
  try {
    const { id, skip, limit, searchkey } = req.query;
    if (id && mongoose.isValidObjectId(id)) {
      const response = await PrivacyPolicy.findById(id).populate("franchise");
      return res.status(200).json({
        success: true,
        message: `Retrieved specific privacy policy`,
        response,
      });
    }
    const query = searchkey
      ? { ...req.filter, title: { $regex: searchkey, $options: "i" } }
      : req.filter;
    const [totalCount, filterCount, data] = await Promise.all([
      parseInt(skip) === 0 && PrivacyPolicy.countDocuments(),
      parseInt(skip) === 0 && PrivacyPolicy.countDocuments(query),
      PrivacyPolicy.find(query).populate("franchise")
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 50),
    ]);
    res.status(200).json({
      success: true,
      message: `Retrieved all privacy policy`,
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

// @desc      UPDATE PRIVACY POLICY
// @route     PUT /api/v1/privacy-policy
// @access    public
exports.updatePrivacyPolicy = async (req, res) => {
  try {
    const { body, query } = req;
    const { id } = query;

    const updateFields = {
      title: body.title,
      description: body.description,
      franchise: body.franchise,
    };

    const response = await PrivacyPolicy.findByIdAndUpdate(id, updateFields);

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

// @desc      DELETE PRIVACY POLICY
// @route     DELETE /api/v1/privacy-policy
// @access    public
exports.deletePrivacyPolicy = async (req, res) => {
  try {
    const privacyPolicy = await PrivacyPolicy.findByIdAndDelete(req.query.id);

    if (!privacyPolicy) {
      return res.status(404).json({
        success: false,
        message: "Privacy policy not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Privacy policy deleted successfully",
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
// @route     GET /api/v1/privacy-policy/get-by-privacypolicy
// @access    public
exports.getByFranchise = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await PrivacyPolicy.find({ franchise: id });

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