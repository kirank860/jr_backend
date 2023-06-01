const UserRole = require("../models/userRole");

// @desc      Create a new user role
// @route     POST /api/v1/user-role
// @access    private
exports.createUserRole = async (req, res) => {
  try {
    const newUserRole = await UserRole.create(req.body);
    res.status(201).json({
      success: true,
      message: "User role created successfully",
      data: newUserRole,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};

// @desc      Get all user roles
// @route     GET /api/v1/user-role/get-all-user-roles
// @access    private
exports.getAllUserRoles = async (req, res) => {
  try {
    const userRoles = await UserRole.find();

    if (!userRoles.length) {
      return res.status(404).json({
        success: false,
        message: "User roles not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All userRoles retrieved successfully",
      data: userRoles,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};

// @desc      Get a single user role
// @route     GET /api/v1/user-role
// @access    private
exports.getUserRole = async (req, res) => {
  try {
    const userRole = await UserRole.findById(req.query.id);

    if (!userRole) {
      return res.status(404).json({
        success: false,
        message: "UserRole not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "UserRole retrieved successfully",
      data: userRole,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};

// @desc      Update a user role by ID
// @route     PUT /api/v1/user-role
// @access    private
exports.updateUserRole = async (req, res) => {
  try {
    const userRole = await UserRole.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
    });

    if (!userRole) {
      return res.status(404).json({
        success: false,
        message: "UserRole not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "UserRole updated successfully",
      data: userRole,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};

// @desc      Delete a user role by ID
// @route     DELETE /api/v1/user-role
// @access    private
exports.deleteUserRole = async (req, res) => {
  try {
    const userRole = await UserRole.findByIdAndDelete(req.query.id, {
      new: true,
    });

    if (!userRole) {
      return res.status(404).json({
        success: false,
        message: "UserRole not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "UserRole deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};
