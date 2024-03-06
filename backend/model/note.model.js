const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    email: String,
    title: String,
    description: String,
  },
  {
    versionKey: false,
  }
);

const noteModal = mongoose.model("noteSchema", schema);

module.exports = { noteModal };
