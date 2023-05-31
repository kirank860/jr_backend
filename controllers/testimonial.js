const { default: mongoose } = require("mongoose");
const Testimonial = require("../models/testimonial");
const upload = require("../middleware/multer");

const allowed_file_size = 2;
const DIR = "./uploads/testimonial";
const imageType = "image";

// @desc      create Testimonial
// @route     POST /api/v1/testimonial
// @access    public
exports.createTestimonial = async (req, res, next) => {
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

      // Create the Testimonial object
      const testimonial = {
        name: req.body.name,
        company: req.body.company,
        message: req.body.message,
        image: url + "/images/" + req.file.filename,
        // franchise: req.body.franchise,
      };

      if (req.file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          success: false,
          message: "Image too large",
        });
      }

      // Save the Testimonial
      const newTestimonial = await Testimonial.create(testimonial);

      res.status(201).json({
        success: true,
        message: "Testimonials added successfully",
        data: newTestimonial,
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


// @desc      get Testimonial
// @route     GET /api/v1/testimonial
// @access    public
exports.getTestimonial = async (req, res) => {
  try {
    const { id, skip, limit, searchkey } = req.query;
    if (id && mongoose.isValidObjectId(id)) {
      const response = await Testimonial.findById(id);
      return res.status(200).json({
        success: true,
        message: `retrieved specific Testimonials`,
        response,
      });
    }
    const query = searchkey
      ? { ...req.filter, name: { $regex: searchkey, $options: "i" } }
      : req.filter;
    const [totalCount, filterCount, data] = await Promise.all([
      parseInt(skip) === 0 && Testimonial.countDocuments(),
      parseInt(skip) === 0 && Testimonial.countDocuments(query),
      Testimonial.find(query)
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 10),
    ]);
    res.status(200).json({
      success: true,
      message: `retrieved all Testimonials`,
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

// @desc      update Testimonial
// @route     PUT /api/v1/testimonial
// @access    public
exports.updateTestimonial = async (req, res) => {
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
        name: body.name,
        company: body.company,
        message: body.message,
        image: file ? url + "/images/" + file.filename : undefined,
        // franchise: body.franchise,
      };

      if (file && file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          success: false,
          message: "Image file too large",
        });
      }

      const testimonial = await Testimonial.findByIdAndUpdate(id, updateFields);

      res.status(201).json({
        message: "Successfully updated Testimonials",
        data: testimonial,
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

// @desc      delete Testimonial
// @route     DELETE /api/v1/testimonial
// @access    public
exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.query.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonials not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonials deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};
