const { default: mongoose } = require("mongoose");
const ProductCategory = require("../models/productCategory");

// @desc      CREATE PRODUCT CATEGORY
// @route     POST /api/v1/product-category
// @access    public
exports.createProductCategory = async (req, res, next) => {
  try {
    // Create the ProductCategory object
    const productcategory = {
      productCategory: req.body.productCategory,
      franchise: req.body.franchise,
    };

    // Save the ProductCategory
    const newProductCategory = (await ProductCategory.create(productcategory));

    res.status(201).json({
      success: true,
      message: "Product category added successfully",
      data: newProductCategory,
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// @desc      GET PRODUCT CATEGORY
// @route     GET /api/v1/product-category
// @access    public
exports.getProductCategory = async (req, res) => {
  try {
    const { id, skip, limit, searchkey } = req.query;
    if (id && mongoose.isValidObjectId(id)) {
      const response = await ProductCategory.findById(id).populate("franchise");
      return res.status(200).json({
        success: true,
        message: `Retrieved specific product category`,
        response,
      });
    }
    const query = searchkey
      ? { ...req.filter, productCategory: { $regex: searchkey, $options: "i" } }
      : req.filter;
    const [totalCount, filterCount, data] = await Promise.all([
      parseInt(skip) === 0 && ProductCategory.countDocuments(),
      parseInt(skip) === 0 && ProductCategory.countDocuments(query),
      ProductCategory.find(query).populate("franchise")
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 50),
    ]);
    res.status(200).json({
      success: true,
      message: `Retrieved all product category`,
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

// @desc      UPDATE PRODUCT CATEGORY
// @route     PUT /api/v1/product-category
// @access    public
exports.updateProductCategory = async (req, res) => {
  try {
    const { body, query } = req;
    const { id } = query;

    const updateFields = {
      productCategory: body.productCategory,
      franchise: body.franchise,
    };

    const response = await ProductCategory.findByIdAndUpdate(id, updateFields);

    res.status(201).json({
      message: "Successfully updated product catgeegory",
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

// @desc      delete Product category
// @route     DELETE /api/v1/product-category
// @access    public
exports.deleteProductCategory = async (req, res) => {
  try {
    const productcategory = await ProductCategory.findByIdAndDelete(req.query.id);

    if (!productcategory) {
      return res.status(404).json({
        success: false,
        message: "Product category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product category deleted successfully",
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
// @route     GET /api/v1/product-category/get-by-productcategory
// @access    public
exports.getByFranchise = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await ProductCategory.find({ franchise: id });

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
