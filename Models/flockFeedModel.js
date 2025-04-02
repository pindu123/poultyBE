const { required } = require("joi");
const mongoose = require("mongoose");
 
const flockFeed = new mongoose.Schema(
  {
    flockId: {
      type: String,
      required: true,
    },
    feedId: {
      type: String,
      required: true,
    },
    farmId: {
      type: String,
      required: true,
    },
    quantityPerDay: {
      type: String,
      required: true,
    },
    numberOfTimes: {
      type: Number,
    },
  },
  { timestamps: true }
);

const flockFeedModel = mongoose.model("flockFeed", flockFeed);

module.exports = flockFeedModel;
