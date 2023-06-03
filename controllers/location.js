const { default: mongoose } = require("mongoose");
const Location = require("../models/location");

// @desc      CREATE LOCATION
// @route     POST /api/v1/location
// @access    private
exports.createLocation = async (req, res, next) => {
  try {
    // Create the Location object
    const location = {
      location: req.body.location,
    };

    // Save the Location
    const newLocation = await Location.create(location);

    res.status(201).json({
      success: true,
      message: "Location created successfully",
      data: newLocation,
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// @desc      GET LOCATION
// @route     GET /api/v1/location
// @access    private
exports.getLocation = async (req, res) => {
  try {
    const { id, skip, limit, searchkey } = req.query;
    if (id && mongoose.isValidObjectId(id)) {
      const response = await Location.findById(id);
      return res.status(200).json({
        success: true,
        message: `Retrieved specific location`,
        response,
      });
    }
    const query = searchkey
      ? { ...req.filter, location: { $regex: searchkey, $options: "i" } }
      : req.filter;
    const [totalCount, filterCount, data] = await Promise.all([
      parseInt(skip) === 0 && Location.countDocuments(),
      parseInt(skip) === 0 && Location.countDocuments(query),
      Location.find(query)
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 50),
    ]);
    res.status(200).json({
      success: true,
      message: `Retrieved all location`,
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

// @desc      UPDATE LOCATION
// @route     PUT /api/v1/location
// @access    private
exports.updateLocation = async (req, res) => {
  try {
    const { body, query } = req;
    const { id } = query;

    const updateFields = {
      location: body.location,
    };

    const response = await Location.findByIdAndUpdate(body.id, updateFields);

    res.status(201).json({
      message: "Successfully updated location",
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

// @desc      DELETE LOCATION
// @route     DELETE /api/v1/location
// @access    private
exports.deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.query.id);

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Location deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};

// @desc      GET LOCATION'S
// @route     GET /api/v1/location/select
// @access    protect
exports.select = async (req, res) => {
  try {
    const items = await Location.find(
      {},
      { _id: 0, id: "$_id", value: "$location" }
    );
    return res.status(200).send(items);
  } catch (err) {
    console.log(err);
    res.status(204).json({
      success: false,
      message: err,
    });
  }
};