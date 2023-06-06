const { default: mongoose } = require("mongoose");
const SiteIdentity = require("../models/siteIdentity");
const upload = require("../middleware/multer");

const allowed_file_size = 2;
const DIR = "./uploads/siteidentity";
const imageType = "image";

// @desc      CREATE OUR PRODUCT
// @route     POST /api/v1/our-product
// @access    private
exports.createSiteIdentity = async (req, res) => {
  try {
    const newSiteIdentity = await SiteIdentity.create(req.body);
    res.status(201).json({
      success: true,
      message: "Site Identity created successfully",
      data: newSiteIdentity,
    });
    console.log("data is::::", newSiteIdentity);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// @desc      GET OUR PRODUCT
// @route     GET /api/v1/our-product/:id
// @access    private
exports.getSiteIdentity = async (req, res) => {
  try {
    const { id, skip, limit, searchkey } = req.query;
    if (id && mongoose.isValidObjectId(id)) {
      const response = await SiteIdentity.findById(id).populate("franchise");
      return res.status(200).json({
        success: true,
        message: `Retrieved specific Site Identity`,
        response,
      });
    }
    // const query = searchkey
    //   ? { ...req.filter, price: { $regex: searchkey, $options: "i" } }
    //   : req.filter;
    const query = {
      ...req.filter,
      ...(searchkey && {
        $or: [
          { siteTitle: { $regex: searchkey, $options: "i" } },
          { tagLine: { $regex: searchkey, $options: "i" } },
        ],
      }),
    };
    const [totalCount, filterCount, data] = await Promise.all([
      parseInt(skip) === 0 && SiteIdentity.countDocuments(),
      parseInt(skip) === 0 && SiteIdentity.countDocuments(query),
      SiteIdentity.find(query)
        .populate("franchise")
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 50),
    ]);
    res.status(200).json({
      success: true,
      message: `Retrieved all site identity`,
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

// @desc      UPDATE SPECIFIC OUR PRODUCT
// @route     PUT /api/v1/our-product/:id
// @access    private
exports.updateSiteIdentity = async (req, res) => {
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
        siteTitle: body.siteTitle,
        tagLine: body.tagLine,
        siteFavIcon: body.siteFavIcon,
        logo: file ? url + "/images/" + file.filename : undefined,
        franchise: body.franchise,
      };

      if (file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          success: false,
          message: "Image file too large",
        });
      }

      const response = await SiteIdentity.findByIdAndUpdate(id, updateFields);

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

// @desc      DELETE SPECIFIC OUR PRODUCT
// @route     DELETE /api/v1/our-product/:id
// @access    private
exports.deleteSiteIdentity = async (req, res) => {
  try {
    const siteIdentity = await SiteIdentity.findByIdAndDelete(req.query.id);

    if (!siteIdentity) {
      return res.status(404).json({
        success: false,
        message: "Our product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Our product deleted successfully",
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
// @route     GET /api/v1/our-product/get-by-ourproduct
// @access    private
exports.getByFranchise = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await SiteIdentity.find({ franchise: id });

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
