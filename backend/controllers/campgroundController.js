const axios = require("axios");
const User = require("../models/userModel");
const Campground = require("../models/campgroundModel");
const asyncHandler = require("express-async-handler");

const getCampgrounds = asyncHandler(async (req, res) => {
  const start = 0;
  const limit = req.query.start || 5;
  const apiKey = process.env.API_KEY;
  const baseUrl = `https://developer.nps.gov/api/v1/campgrounds?start=${start}&limit=${limit}&api_key=${apiKey}`;
  const response = await axios.get(baseUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });
  console.log(response.data.data);
  const campgrounds = response.data.data;
  res.json(campgrounds);
});

console.log(getCampgrounds);

const addCampground = asyncHandler(async (req, res) => {
  // const { name, description, url, addresses, images, userId } = req.body;
  const { name, description, url, addresses, images } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  console.log(user);

  const campground = await Campground.create({
    name,
    description,
    url,
    addresses,
    images,
    user: user._id,
  });

  const savedCampground = await campground.save();

  user.campgrounds.push(savedCampground._id);
  await user.save();

  res.status(201);
});

const getMyCampgrounds = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const myCampgrounds = await Campground.find({ user: req.user._id });
    res.json(myCampgrounds);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

const deleteCampground = asyncHandler(async (req, res) => {
  const campground = await Campground.findById(req.params._id);

  console.log(campground);

  if (!campground) {
    res.status(404).json({ message: "Campground not found" });
    return;
  }

  const user = await User.findById(campground.user);
  console.log(`THIS IS THE USER: ${user}`);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  await Campground.findByIdAndDelete(req.params._id);

  res.json({ message: "Campground removed" });
});

module.exports = {
  getCampgrounds,
  addCampground,
  getMyCampgrounds,
  deleteCampground,
};
