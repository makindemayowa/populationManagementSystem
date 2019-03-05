const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const nestedLocationSchema = new Schema(
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
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("NestedLocation", nestedLocationSchema);
