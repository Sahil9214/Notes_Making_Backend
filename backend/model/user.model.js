const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    phoneNumber: String,
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("userSchema", userSchema);
module.exports = { userModel };
