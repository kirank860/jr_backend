const { default: mongoose } = require("mongoose");
const ContactUs = require("../models/contactUs");
const upload = require("../middleware/multer");

const allowed_file_size = 2;
const DIR = "./uploads/contactus";
const imageType = "image";

// @desc      CREATE CONTACT US
// @route     POST /api/v1/contact-us
// @access    private
exports.createContactUs = async (req, res) => {
  try {
    // console.log(req.body)
    const newContactUs = await ContactUs.create(req.body);

    res.status(201).json({
      success: true,
      message: "Contact us added successfully",
      data: newContactUs,
    });

  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// @desc      GET CONTACT US
// @route     GET /api/v1/contact-us
// @access    private
exports.getContactUs = async (req, res) => {
  try {
    const { id, skip, limit, searchkey } = req.query;
    if (id && mongoose.isValidObjectId(id)) {
      const response = await ContactUs.findById(id).populate("franchise");
      return res.status(200).json({
        success: true,
        message: `Retrieved specific contact us`,
        response,
      });
    }

    const query = {
      ...req.filter,
      ...(searchkey && {
        $or: [
          { title: { $regex: searchkey, $options: "i" } },
          { subTitle: { $regex: searchkey, $options: "i" } },
          { primaryPhone: { $regex: searchkey, $options: "i" } },
          { secondaryPhone: { $regex: searchkey, $options: "i" } },
          { primaryEmail: { $regex: searchkey, $options: "i" } },
          { secondaryEmail: { $regex: searchkey, $options: "i" } },
          { locationUrl: { $regex: searchkey, $options: "i" } },
        ],
      }),
    };

    const [totalCount, filterCount, data] = await Promise.all([
      parseInt(skip) === 0 && ContactUs.countDocuments(),
      parseInt(skip) === 0 && ContactUs.countDocuments(query),
      ContactUs.find(query)
        .populate("franchise")
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 50),
    ]);
    res.status(200).json({
      success: true,
      message: `Retrieved all contact us`,
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

// @desc      UPDATE CONTACT US
// @route     PUT /api/v1/contact-us
// @access    private
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
        primaryAddress: body.primaryAddress,
        secondaryAddress: body.secondaryAddress,
        primaryPhone: body.primaryPhone,
        secondaryPhone: body.secondaryPhone,
        primaryEmail: body.primaryEmail,
        secondaryEmail: body.secondaryEmail,
        locationUrl: body.locationUrl,
        contactusImage: file ? url + "/images/" + file.filename : undefined,
        franchise: body.franchise,
      };

      if (file && file.size / (1024 * 1024) > allowed_file_size) {
        return res.status(401).json({
          success: false,
          message: "Image file too large",
        });
      }

      const response = await ContactUs.findByIdAndUpdate(id, updateFields);

      res.status(201).json({
        message: "Successfully updated contact us",
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

// @desc      DELETE CONTACT US
// @route     DELETE /api/v1/contact-us
// @access    private
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

// @desc      GET BY FRANCHISE
// @route     GET /api/v1/contact-us/get-by-contactus
// @access    private
exports.getByFranchise = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await ContactUs.find({ franchise: id });

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