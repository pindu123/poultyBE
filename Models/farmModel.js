const { required, number } = require("joi");
const mongoose = require("mongoose");

const farm = new mongoose.Schema(
  {
  farmName: {
    type: String,
    required: true,
  },
  farmEstDate: {
    type: String,
  },

  farmType: {
    type: String,
    required: true,
  },
  farmCapacity: {
    type: Number,
    required: true,
  },
  farmOwner: {
    type: String,
    required: true,
  },
  farmSize: {
    type: Number,
  },
  sizeUnit: {
    type: String,
  },
  blocks: [
    {
      blockId: {
        type: Number,
        required: true,
      },
      blockName:{
        type:String,
        required:true
      },
      blockType: {
        type: String,
        required: false,
      },
      blockCapacity: {
        type: Number,
        required: true,
      },
      currentBirdCount: {
        type: Number,
        required: true,
      },
    },
  ],

  district: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },
  mandal: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  village: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},{timestamps:true});

const farmModel = mongoose.model("farm", farm);

module.exports = farmModel;
