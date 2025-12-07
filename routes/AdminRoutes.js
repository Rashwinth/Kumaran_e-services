const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { register } = require("../controller/EmployeeController");

// Public routes
router.get("/", (req, res) => {
  res.send("Backend is running");
});

// Protected routes
router.post("/registeremployee/:id", protect, register);

module.exports = router;
