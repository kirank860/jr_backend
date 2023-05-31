const { default: mongoose } = require("mongoose");
const OurProduct = require("../models/ourProduct");
const upload = require("../middleware/multer");

const allowed_file_size = 2;
const DIR = "./uploads/ourproduct";
const imageType = "image";

// @desc      CREATE OUR PRODUCT
// @route     POST /api/v1/our-product
// @access    protect
exports.createOurProduct = async (req, res) => {
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

      // Create the OurProduct object
      const ourproduct = {
        productCategory: req.body.productCategory,
        productSequence: req.body.productSequence,
        productId: req.body.productId,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        offerPrice: req.body.offerPrice,
        image: url + "/images/" + req.file.filename,
        brand: req.body.brand,
        features: req.body.features,
        rating: req.body.rating,
        franchise: req.body.franchise,
      };

      if (req.file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          success: false,
          message: "Image file too large",
        });
      }

      // Save the OurProduct
      const newOurProduct = await OurProduct.create(ourproduct);

      res.status(201).json({
        success: true,
        message: "Our product created successfully",
        data: newOurProduct,
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

// @desc      GET OUR PRODUCT
// @route     GET /api/v1/our-product/:id
// @access    protect
exports.getOurProduct = async (req, res) => {
  try {
    const { id, skip, limit, searchkey } = req.query;
    if (id && mongoose.isValidObjectId(id)) {
      const response = await OurProduct.findById(id)
        .populate("productCategory")
        .populate("franchise");
      return res.status(200).json({
        success: true,
        message: `Retrieved specific our product`,
        response,
      });
    }
    const query = searchkey
      ? { ...req.filter, price: { $regex: searchkey, $options: "i" } }
      : req.filter;
    const [totalCount, filterCount, data] = await Promise.all([
      parseInt(skip) === 0 && OurProduct.countDocuments(),
      parseInt(skip) === 0 && OurProduct.countDocuments(query),
      OurProduct.find(query)
        .populate("productCategory")
        .populate("franchise")
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 50),
    ]);
    res.status(200).json({
      success: true,
      message: `Retrieved all our product`,
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
// @access    protect
exports.updateOurProduct = async (req, res) => {
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
        productCategory: body.productCategory,
        productSequence: body.productSequence,
        productId: body.productId,
        name: body.name,
        description: body.description,
        price: body.price,
        offerPrice: body.offerPrice,
        image: file ? url + "/images/" + file.filename : undefined,
        brand: body.brand,
        features: body.features,
        rating: body.rating,
        franchise: body.franchise,
      };

      if (file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          success: false,
          message: "Image file too large",
        });
      }

      const response = await OurProduct.findByIdAndUpdate(id, updateFields);

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
// @access    protect
exports.deleteOurProduct = async (req, res) => {
  try {
    const ourproduct = await OurProduct.findByIdAndDelete(req.query.id);

    if (!ourproduct) {
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
// @access    public
exports.getByFranchise = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await OurProduct.find({ franchise: id });

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