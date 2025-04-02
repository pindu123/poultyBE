const { required, number } = require("joi");
const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  batchName: {
    type: String,
    required: true,
  },
  flockType:{
      type:String,
      required:false
  },
  farmId:{
    type:String,
    required:true
  },
  birdCount: {
    type: Number,
    required: true,
  },
  blockId: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  purpose:{
    type:String
  },
 
  flockfrom:{
    type:String
  }
},{timestamps:true});

const flock = mongoose.model("flock", batchSchema);

module.exports = flock;
