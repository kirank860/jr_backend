const { default: mongoose } = require("mongoose");
const OurSpeciality = require("../models/ourSpeciality");

// @desc      CREATE OUR SPECIALITY
// @route     POST /api/v1/our-speciality
// @access    private
exports.createOurSpeciality = async (req, res) => {
  try {
    // Save the OurSpeciality
    const newOurSpeciality = await OurSpeciality.create(req.body);
    res.status(201).json({
      success: true,
      message: "Our specialities added successfully",
      data: newOurSpeciality,
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// @desc      GET OUR SPECIALITY
// @route     GET /api/v1/our-speciality
// @access    private
exports.getOurSpeciality = async (req, res) => {
  try {
    const { id, skip, limit, searchkey } = req.query;
    if (id && mongoose.isValidObjectId(id)) {
      const response = await OurSpeciality.findById(id).populate("franchise");
      return res.status(200).json({
        success: true,
        message: `Retrieved specific our speciality`,
        response,
      });
    }
    // const query = searchkey
    //   ? { ...req.filter, title: { $regex: searchkey, $options: "i" } }
    //   : req.filter;
    const query = {
      ...req.filter,
      ...(searchkey && {
        $or: [
          { title: { $regex: searchkey, $options: "i" } },
          { subTitle: { $regex: searchkey, $options: "i" } },
        ],
      }),
    };
    const [totalCount, filterCount, data] = await Promise.all([
      parseInt(skip) === 0 && OurSpeciality.countDocuments(),
      parseInt(skip) === 0 && OurSpeciality.countDocuments(query),
      OurSpeciality.find(query)
        .populate("franchise")
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 50),
    ]);
    res.status(200).json({
      success: true,
      message: `Retrieved all our speciality`,
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

// @desc      UPDATE OUR SPECIALITY
// @route     PUT /api/v1/our-speciality
// @access    private
exports.updateOurSpeciality = async (req, res) => {
  console.log(req.query)
  console.log(req.body)
  try {
    const { body, query } = req;
    const { id } = query;

    const updateFields = {
      pageTitle: body.pageTitle,
      pageSubTitle: body.pageSubTitle,
      bannerImage: file ? url + "/images/" + file.filename : undefined,
      title: body.title,
      subTitle: body.subTitle,
      description: body.description,
      specialityImage: file ? url + "/images/" + file.filename : undefined,
      franchise: body.franchise,
    };

    const response = await OurSpeciality.findByIdAndUpdate(body.id, updateFields);
    res.status(201).json({
      message: "Successfully updated our speciality",
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

// @desc      DELETE OUR SPECIALITY
// @route     DELETE /api/v1/our-speciality
// @access    private
exports.deleteOurSpeciality = async (req, res) => {
  try {
    const ourSpeciality = await OurSpeciality.findByIdAndDelete(req.query.id);

    if (!ourSpeciality) {
      return res.status(404).json({
        success: false,
        message: "Our speciality not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Our speciality deleted successfully",
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
// @route     GET /api/v1/our-speciality/get-by-ourspeciality
// @access    private
exports.getByFranchise = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await OurSpeciality.find({ franchise: id });

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