const User = require("../models/user");

// @desc      Create a new user
// @route     POST /api/v1/user
// @access    Public
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};

// @desc      Get all users
// @route     GET /api/v1/user/get-all-users
// @access    Public
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("franchise", { name: 1, _id: 0 })
      .populate("userRole", ["role"]);

    if (!users.length) {
      return res.status(404).json({
        success: false,
        message: "Users not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All users retrieved successfully",
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};

// @desc      Get a single user by ID
// @route     GET /api/v1/user/:id
// @access    Public
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.query.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};

// @desc      Update a user by ID
// @route     PUT /api/v1/user/:id
// @access    Public
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};

// @desc      Delete a user by ID
// @route     DELETE /api/v1/user/:id
// @access    Public
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.query.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};
