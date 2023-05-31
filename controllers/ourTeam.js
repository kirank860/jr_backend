const { default: mongoose } = require("mongoose");
const OurTeam = require("../models/ourTeam");
const upload = require("../middleware/multer");

const allowed_file_size = 2;
const DIR = "./uploads/ourteam";
const imageType = "image";

// @desc      CREATE NEW OURTEAM
// @route     POST /api/v1/our-team
// @access    protect
exports.createOurTeam = async (req, res) => {
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

      // Create the OurTeam object
      const ourteam = {
        groupId: req.body.groupId,
        groupTitle: req.body.groupTitle,
        groupSubTitle: req.body.groupSubTitle,
        name: req.body.name,
        position: req.body.position,
        bio: req.body.bio,
        image: url + "/images/" + req.file.filename,
        instaId: req.body.instaId,
        facebookId: req.body.facebookId,
        twitterId: req.body.twitterId,
        linkedinId: req.body.linkedinId,
        pinterestId: req.body.pinterestId,
        youtubeId: req.body.youtubeId,
        whatsapp: req.body.whatsapp,
        franchise: req.body.franchise,
      };

      if (req.file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          success: false,
          message: "Image file too large",
        });
      }

      // Save the OurTeam
      const newOurTeam = await OurTeam.create(ourteam);

      res.status(201).json({
        success: true,
        message: "Our team created successfully",
        data: newOurTeam,
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

// @desc      GET OURTEAM
// @route     GET /api/v1/our-team/:id
// @access    protect
exports.getOurTeam = async (req, res) => {
  try {
    const { id, skip, limit, searchkey } = req.query;
    if (id && mongoose.isValidObjectId(id)) {
      const response = await OurTeam.findById(id).populate("franchise");
      return res.status(200).json({
        success: true,
        message: `Retrieved specific our team`,
        response,
      });
    }
    const query = searchkey
      ? { ...req.filter, groupId: { $regex: searchkey, $options: "i" } }
      : req.filter;
    const [totalCount, filterCount, data] = await Promise.all([
      parseInt(skip) === 0 && OurTeam.countDocuments(),
      parseInt(skip) === 0 && OurTeam.countDocuments(query),
      OurTeam.find(query)
        .populate("franchise")
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 50),
    ]);
    res.status(200).json({
      success: true,
      message: `Retrieved all our team`,
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

// @desc      UPDATE SPECIFIC OURTEAM
// @route     PUT /api/v1/our-team/:id
// @access    protect
exports.updateOurTeam = async (req, res) => {
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
        groupId: body.groupId,
        groupTitle: body.groupTitle,
        groupSubTitle: body.groupSubTitle,
        name: body.name,
        position: body.position,
        bio: body.bio,
        image: file ? url + "/images/" + file.filename : undefined,
        instaId: body.instaId,
        facebookId: body.facebookId,
        twitterId: body.twitterId,
        linkedinId: body.linkedinId,
        pinterestId: body.pinterestId,
        youtubeId: body.youtubeId,
        whatsapp: body.whatsapp,
        franchise: body.franchise,
      };

      if (file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          success: false,
          message: "Image file too large",
        });
      }

      const response = await OurTeam.findByIdAndUpdate(id, updateFields);

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

// @desc      DELETE SPECIFIC OURTEAM
// @route     DELETE /api/v1/our-team/:id
// @access    protect
exports.deleteOurTeam = async (req, res) => {
  try {
    const ourteam = await OurTeam.findByIdAndDelete(req.query.id);

    if (!ourteam) {
      return res.status(404).json({
        success: false,
        message: "Our team not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Our team deleted successfully",
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
// @route     GET /api/v1/our-team/get-by-ourteam
// @access    public
exports.getByFranchise = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await OurTeam.find({ franchise: id });

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