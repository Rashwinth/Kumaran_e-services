const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    //barcode
    sku: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      index: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },

    // Unit of Measurement (e.g., kg, pcs, ltr)
    unit: {
      type: String,
      required: true,
      trim: true,
      default: "pcs",
    },

    // GST details
    gstType: {
      type: String,
      enum: ["Included", "NotIncluded", "NotApplicable"],
      default: "NotIncluded",
      required: true,
    },
    gst: {
      cgst: { type: Number, default: 0 },
      sgst: { type: Number, default: 0 },
      isGstApplicable: { type: Boolean, default: true },
      codeType: {
        type: String,
        enum: ["HSN", "SAC"],
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
    },

    // Cost Price
    costPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    mrp: {
      type: Number,
      required: true,
      min: 0,
    },

    // Selling Price
    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // Status
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
