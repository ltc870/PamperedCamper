const mongoose = require("mongoose");

const campgroundSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: false },
  images: { type: Array, required: false },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Campground", campgroundSchema);
