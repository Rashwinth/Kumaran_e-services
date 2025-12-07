const mongoose = require("mongoose");
const { Schema } = mongoose;

const balanceSchema = new Schema({
date: { type: Date, required: true, default: Date.now },
openingBalance: { type: Number, required: true, default: 0 },
closingBalance: { type: Number, required: true, default: 0 },
});

const accountSchema = new Schema(
{
type: {
type: String,
enum: ["Upi","Cash"],
required: true,
},
branch: {
type: Schema.Types.ObjectId,
ref: "Branch",
required: true,
},
balanceHistory: [balanceSchema],
status: {
type: String,
enum: ["Active", "Inactive", "Closed"],
default: "Active",
},
},
{ timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
