const { default: mongoose } = require("mongoose");
const ContactUs = require("../models/contactUs");
const upload = require("../middleware/multer");

const allowed_file_size = 2;
const DIR = "./uploads/contactus";
const imageType = "image";

// @desc      create ContactUs
// @route     POST /api/v1/contact-us
// @access    public
exports.createContactUs = async (req, res, next) => {
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

      // Create the Contactus object
      const contactUs = {
        title: req.body.title,
        subTitle: req.body.subTitle,
        description: req.body.description,
        image: url + "/images/" + req.file.filename,
        primaryAddress: req.body.primaryAddress,
        secondaryAddress: req.body.secondaryAddress,
        primaryPhone: req.body.primaryPhone,
        secondaryPhone: req.body.secondaryPhone,
        primaryEmail: req.body.primaryEmail,
        secondaryEmail: req.body.secondaryEmail,
        locationUrl: req.body.locationUrl,
        // franchise: req.body.franchise,
      };

      if (req.file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          success: false,
          message: "Image too large",
        });
      }

      // Save the Contactus
      const newContactUs = await ContactUs.create(contactUs);

      res.status(201).json({
        success: true,
        message: "Contact us added successfully",
        data: newContactUs,
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


// @desc      get ContactUs
// @route     GET /api/v1/Contact-us
// @access    public
exports.getContactUs = async (req, res) => {
  try {
    const { id, skip, limit, searchkey } = req.query;
    if (id && mongoose.isValidObjectId(id)) {
      const response = await ContactUs.findById(id);
      return res.status(200).json({
        success: true,
        message: `retrieved specific ContactUs`,
        response,
      });
    }
    const query = searchkey
      ? { ...req.filter, title: { $regex: searchkey, $options: "i" } }
      : req.filter;
    const [totalCount, filterCount, data] = await Promise.all([
      parseInt(skip) === 0 && ContactUs.countDocuments(),
      parseInt(skip) === 0 && ContactUs.countDocuments(query),
      ContactUs.find(query)
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 10),
    ]);
    res.status(200).json({
      success: true,
      message: `retrieved all ContactUs`,
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

// @desc      update ContactUs
// @route     PUT /api/v1/Contact-us
// @access    public
exports.updateContactUs = async (req, res) => {
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
            subTitle: body.subTitle,
            description: body.description,
            image: url + "/images/" + file.filename,
            primaryAddress: body.primaryAddress,
            secondaryAddress: body.secondaryAddress,
            primaryPhone: body.primaryPhone,
            secondaryPhone: body.secondaryPhone,
            primaryEmail: body.primaryEmail,
            secondaryEmail: body.secondaryEmail,
            locationUrl: body.locationUrl,
            // franchise: body.franchise,
      };

      if (file && file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          success: false,
          message: "Image file too large",
        });
      }

      const response = await ContactUs.findByIdAndUpdate(id, updateFields);

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

// @desc      delete ContactUs
// @route     DELETE /api/v1/Contact-us
// @access    public
exports.deleteContactUs = async (req, res) => {
  try {
    const contactus = await ContactUs.findByIdAndDelete(req.query.id);

    if (!contactus) {
      return res.status(404).json({
        success: false,
        message: "Contact us not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact us deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};
