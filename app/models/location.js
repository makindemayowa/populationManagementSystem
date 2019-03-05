const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const locationSchema = new Schema(
  {
    name: {
      type: String
    },
    male: {
      type: Number
    },
    female: {
      type: Number
    },
    total: {
      type: Number
    },
    status: {
      type: String,
      enum: ["active", "deleted"],
      default: "active"
    },
    nestedLocations: [{ type: Schema.Types.ObjectId, ref: "NestedLocation" }]
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Location", locationSchema);
