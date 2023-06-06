const { default: mongoose } = require("mongoose");
const PostManagement = require("../models/postManagement");
const upload = require("../middleware/multer");

const allowed_file_size = 2;
const DIR = "./uploads/postmanagement";
const imageType = "featuredImage";

// @desc      CREATE POST MANAGEMENT
// @route     POST /api/v1/post-management
// @access    private
exports.createPostManagement = async (req, res, next) => {
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

      // Create the PostManagement object
      const postmanagement = {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        date: req.body.date,
        featuredImage: url + "/images/" + req.file.filename,
        category: req.body.category,
        franchise: req.body.franchise,
      };

      if (req.file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          success: false,
          message: "Image too large",
        });
      }

      // Save the PostManagement
      const newPostManagement = (await PostManagement.create(postmanagement));

      res.status(201).json({
        success: true,
        message: "Post management added successfully",
        data: newPostManagement,
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


// @desc      GET POST MANAGEMENT
// @route     GET /api/v1/post-management
// @access    private
exports.getPostManagement = async (req, res) => {
  try {
    const { id, skip, limit, searchkey } = req.query;
    if (id && mongoose.isValidObjectId(id)) {
      const response = await PostManagement.findById(id).populate("franchise");
      return res.status(200).json({
        success: true,
        message: `Retrieved specific post management`,
        response,
      });
    }
    const query = searchkey
      ? { ...req.filter, title: { $regex: searchkey, $options: "i" } }
      : req.filter;
    const [totalCount, filterCount, data] = await Promise.all([
      parseInt(skip) === 0 && PostManagement.countDocuments(),
      parseInt(skip) === 0 && PostManagement.countDocuments(query),
      PostManagement.find(query).populate("franchise")
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 50),
    ]);
    res.status(200).json({
      success: true,
      message: `Retrieved all post management`,
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

// @desc      UPDATE POST MANAGEMENT
// @route     PUT /api/v1/post-management
// @access    private
exports.updatePostManagement = async (req, res) => {
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
        title: body.title,
        author: body.author,
        content: body.content,
        date: body.date,
        featuredImage: file ? url + "/images/" + file.filename : undefined,
        category: body.category,
        franchise: body.franchise,
      };

      if (file && file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          success: false,
          message: "Image file too large",
        });
      }

      const response = await PostManagement.findByIdAndUpdate(id, updateFields);

      res.status(201).json({
        message: "Successfully updated post management",
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

// @desc      DELETE POST MANAGEMENT
// @route     DELETE /api/v1/post-management
// @access    private
exports.deletePostManagement = async (req, res) => {
  try {
    const postmanagement = await PostManagement.findByIdAndDelete(req.query.id);

    if (!postmanagement) {
      return res.status(404).json({
        success: false,
        message: "Post management not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post management deleted successfully",
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
// @route     GET /api/v1/post-management/get-by-postmanagement
// @access    private
exports.getByFranchise = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await PostManagement.find({ franchise: id });

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