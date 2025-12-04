const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    employeeId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      uppercase: true,
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
      match: [/^[0-9]{10}$/, "Please provide a valid 10-digit phone number"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Password must be at least 8 characters"],
      validate: {
        validator: function (password) {
          // Password must contain:
          // - At least 8 characters
          // - At least 1 uppercase letter
          // - At least 1 lowercase letter
          // - At least 1 number
          // - At least 1 special character
          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          return passwordRegex.test(password);
        },
        message:
          "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character (@$!%*?&)",
      },
      select: false,
    },
    role: {
      type: String,
      enum: ["staff", "admin", "manager"],
      default: "staff",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    credentials: {
      refreshToken: {
        type: String,
        select: false,
      },
      tokenVersion: {
        type: Number,
        default: 0,
      },
      lastTokenRefresh: {
        type: Date,
      },
    },
    lastLogin: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Generate employee ID and encrypt password before saving
userSchema.pre("save", async function () {
  try {
    // Generate employee ID if new user
    if (!this.employeeId && this.isNew) {
      const count = await mongoose.model("User").countDocuments();
      this.employeeId = `EMP${String(count + 1).padStart(4, "0")}`;
    }

    // Hash password if modified
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }

  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

// Method to get user without sensitive data
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.credentials;
  return user;
};

module.exports = mongoose.model("User", userSchema);
