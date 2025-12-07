const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({
          success: false,
          message: "Email already registered",
        });
      }
      if (existingUser.phone === phone) {
        return res.status(400).json({
          success: false,
          message: "Phone number already registered",
        });
      }
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
    });

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(
      user._id,
      user.credentials.tokenVersion
    );

    // Store refresh token in database
    user.credentials.refreshToken = refreshToken;
    user.credentials.lastTokenRefresh = Date.now();
    await user.save({ validateBeforeSave: false });

    res.status(201).json({
      success: true,
      message: "Employee registered successfully",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        employeeId: user.employeeId,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages[0],
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};
