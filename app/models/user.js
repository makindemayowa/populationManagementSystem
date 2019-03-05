const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  bcrypt = require("bcrypt-nodejs"),
  SALT_WORK_FACTOR = 10;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true
    },
    password: String
  },
  { timestamps: { createdAt: "created_at" } }
);

(UserSchema.methods.comparePassword = function(plainText) {
  return bcrypt.compareSync(plainText, this.password);
}),
  (module.exports = mongoose.model("User", UserSchema));
