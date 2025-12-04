const express = require("express");
const router = express.Router();
const {
  register,
  login,
  refreshToken,
  logout,
  getMe,
  updatePassword,
} = require("../controller/authController");
const { protect } = require("../middleware/auth");

// Public routes
router.get("/", (req, res) => {
  res.send("Backend is running");
});

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);

// Protected routes
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);
router.put("/updatepassword", protect, updatePassword);

module.exports = router;
