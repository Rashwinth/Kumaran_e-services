const mongoose = require("mongoose");

const creditItemSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
});

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },
    branchCode: {
      type: String,
      required: true,
      index: true,
    },

    credits: [creditItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
