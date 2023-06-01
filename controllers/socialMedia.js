const { default: mongoose } = require("mongoose");
const SocialMedia = require("../models/socialMedia");

// @desc      CREATE SOCIAL MEDIA
// @route     POST /api/v1/social-media
// @access    private
exports.createSocialMedia = async (req, res) => {
  try {
    // Create the SocialMedia object
    const socialmedia = {
      instaId: req.body.instaId,
      facebookId: req.body.facebookId,
      twitterId: req.body.twitterId,
      linkedinId: req.body.linkedinId,
      pinterestId: req.body.pinterestId,
      youtubeId: req.body.youtubeId,
      whatsapp: req.body.whatsapp,
      franchise: req.body.franchise,
    };

    // Save the SocialMedia
    const newSocialMedia = await SocialMedia.create(socialmedia);

    res.status(201).json({
      success: true,
      message: "Social media created successfully",
      data: newSocialMedia,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// @desc      GET SOCIAL MEDIA
// @route     GET /api/v1/social-media/:id
// @access    private
exports.getSocialMedia = async (req, res) => {
  try {
    const { id, skip, limit, searchkey } = req.query;
    if (id && mongoose.isValidObjectId(id)) {
      const response = await SocialMedia.findById(id).populate("franchise");
      return res.status(200).json({
        success: true,
        message: `Retrieved specific social media`,
        response,
      });
    }
    const query = searchkey
      ? { ...req.filter, instaId: { $regex: searchkey, $options: "i" } }
      : req.filter;
    const [totalCount, filterCount, data] = await Promise.all([
      parseInt(skip) === 0 && SocialMedia.countDocuments(),
      parseInt(skip) === 0 && SocialMedia.countDocuments(query),
      SocialMedia.find(query)
        .populate("franchise")
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 50),
    ]);
    res.status(200).json({
      success: true,
      message: `Retrieved all social media`,
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

// @desc      UPDATE SPECIFIC SOCIAL MEDIA
// @route     PUT /api/v1/social-media/:id
// @access    private
exports.updateSocialMedia = async (req, res) => {
  try {
    const { body, query } = req;
    const { id } = query;

    const updateFields = {
      instaId: body.instaId,
      facebookId: body.facebookId,
      twitterId: body.twitterId,
      linkedinId: body.linkedinId,
      pinterestId: body.pinterestId,
      youtubeId: body.youtubeId,
      whatsapp: body.whatsapp,
      franchise: body.franchise,
    };

    const response = await SocialMedia.findByIdAndUpdate(id, updateFields);
    res.status(201).json({
      message: "Successfully updated social media",
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

// @desc      DELETE SPECIFIC SOCIAL MEDIA
// @route     DELETE /api/v1/social-media/:id
// @access    private
exports.deleteSocialMedia = async (req, res) => {
  try {
    const socialmedia = await SocialMedia.findByIdAndDelete(req.query.id);

    if (!socialmedia) {
      return res.status(404).json({
        success: false,
        message: "Social media not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Social media deleted successfully",
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
// @route     GET /api/v1/social-media/get-by-socialmedia
// @access    private
exports.getByFranchise = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await SocialMedia.find({ franchise: id });

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