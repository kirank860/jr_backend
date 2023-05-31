const { default: mongoose } = require("mongoose");
const PostCategory = require("../models/postCategory");

// @desc      CREATE POST CATEGORY
// @route     POST /api/v1/post-category
// @access    public
exports.createPostCategory = async (req, res, next) => {
  try {
    // Create the PostCategory object
    const postcategory = {
      category: req.body.category,
      isActive: req.body.isActive,
      franchise: req.body.franchise,
    };

    // Save the PostCategory
    const newPostCategory = await PostCategory.create(postcategory);

    res.status(201).json({
      success: true,
      message: "Post category created successfully",
      data: newPostCategory,
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// @desc      GET POST CATEGORY
// @route     GET /api/v1/post-category
// @access    public
exports.getPostCategory = async (req, res) => {
  try {
    const { id, skip, limit, searchkey } = req.query;
    if (id && mongoose.isValidObjectId(id)) {
      const response = await PostCategory.findById(id).populate("franchise");
      return res.status(200).json({
        success: true,
        message: `Retrieved post category`,
        response,
      });
    }
    const query = searchkey
      ? { ...req.filter, category: { $regex: searchkey, $options: "i" } }
      : req.filter;
    const [totalCount, filterCount, data] = await Promise.all([
      parseInt(skip) === 0 && PostCategory.countDocuments(),
      parseInt(skip) === 0 && PostCategory.countDocuments(query),
      PostCategory.find(query)
        .populate("franchise")
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 50),
    ]);
    res.status(200).json({
      success: true,
      message: `Retrieved all post category`,
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

// @desc      UPDATE POST CATEGORY
// @route     PUT /api/v1/post-category
// @access    public
exports.updatePostCategory = async (req, res) => {
  try {
    const { body, query } = req;
    const { id } = query;

    const updateFields = {
      category: body.category,
      isActive: body.isActive,
      franchise: body.franchise,
    };

    const response = await PostCategory.findByIdAndUpdate(id, updateFields);

    res.status(201).json({
      message: "Successfully updated post category",
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

// @desc      DELETE POST CATEGORY
// @route     DELETE /api/v1/post-category
// @access    public
exports.deletePostCategory = async (req, res) => {
  try {
    const postcategory = await PostCategory.findByIdAndDelete(req.query.id);

    if (!postcategory) {
      return res.status(404).json({
        success: false,
        message: "Post category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post category deleted successfully",
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
// @route     GET /api/v1/post-category/get-by-postcategory
// @access    public
exports.getByFranchise = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await PostCategory.find({ franchise: id });

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
