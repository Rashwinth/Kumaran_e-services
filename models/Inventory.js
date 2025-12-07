const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 5,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Ensure unique combination of product and branch
inventorySchema.index({ product: 1, branch: 1 }, { unique: true });

module.exports = mongoose.model("Inventory", inventorySchema);
