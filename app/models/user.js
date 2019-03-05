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

UserSchema.pre("save", function(next) {
  var user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    user.password = bcrypt.hashSync(user.password, salt);
    next();
  });
});

(UserSchema.methods.comparePassword = function(plainText) {
  return bcrypt.compareSync(plainText, this.password);
}),
  (module.exports = mongoose.model("User", UserSchema));
