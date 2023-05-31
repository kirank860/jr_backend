const Menu = require("../models/menu");
const User = require("../models/user");
const getMenu = async (role) => {
  const menu = await Menu.aggregate([
    {
      $lookup: {
        from: "submenus",
        let: { menuId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$menu", "$$menuId"] },
            },
          },
          {
            $sort: { sequence: 1 },
          },
        ],
        as: "submenus",
      },
    },
    {
      $sort: { sequence: 1 },
    },
  ]).exec();

  return menu;
};

// Get token from model, create cookie and send response
const sendTokenResponse = async (user, res) => {
  const { email, password, userRole, _id } = user;
  const token = user.getSignedJwtToken();
  if (!token) {
    res.status(200).json({
      success: false,
      message: "Something went wrong!",
    });
  } else {
    const menu = await getMenu(userRole);
    res.status(200).json({
      user,
      menu,
      token,
      success: true,
      message: "welcome back",
    });
  }
};

// @desc      GET CURRENT LOGGED UER
// @route     GET /api/v1/auth/me
// @access    Private
exports.getMe = async (req, res) => {
  //This req.user come from middleware -> auth -> protect
  const admin = await User.findById(req.user.id);

  // if (admin.role === "admin") {
  res.status(200).json({
    success: true,
    admin,
  });
  // }
};

// @desc      LOGIN USER
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const checkMail = await User.findOne({ email })
      .populate("userRole")
      .select("+password");
    if (!checkMail) {
      res.status(200).json({
        success: false,
        message: "There is no user corresponding to the email address.",
      });
    } else {
      const checkPassword = await checkMail.matchPassword(password);
      if (!checkPassword) {
        res.status(200).json({
          success: false,
          message: "Wrong password",
        });
      } else {
        sendTokenResponse(checkMail, res);
      }
    }
  } catch (err) {
    console.log("error check", err);
    res.status(400).json({
      success: false,
      message: err.toString(),
    });
  }
};
