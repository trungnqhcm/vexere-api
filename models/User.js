const mongoose = require("mongoose");
const { promisify } = require("util");
const bcrypt = require("bcryptjs");

const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash);

//*create schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  userType: { type: String, default: "client" },
  avatar: { type: String },
});

UserSchema.pre("save", function (next) {
  const user = this;
  return genSalt(10)
    .then((salt) => {
      return hash(user.password, salt);
    })
    .then((hash) => {
      user.password = hash;
      next();
    });
});

//*create model
const User = mongoose.model("User", UserSchema, "User");

module.exports = {
  UserSchema,
  User,
};
