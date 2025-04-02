const flockValidation = require("../Helper/batchHelper");
const feedHelper = require("../Helper/feedHelper");
const flockFeedHelper = require("../Helper/flockFeedHelper");
const flock = require("../Models/batchModel");
const farmModel = require("../Models/farmModel");
const feedModel = require("../Models/feedModel");
const financeModel = require("../Models/financeModel");
const flockFeedModel = require("../Models/flockFeedModel");

const addFlock = async (req, res) => {
  try {
    const farmId = req.user.farmId;

    let flockData = {
      batchName: req.body.batchName,
      birdCount: req.body.birdCount,
      blockId: req.body.blockId,
      startDate: req.body.startDate,
      purpose: req.body.purpose,
      flockfrom: req.body.flockfrom,
      farmId: farmId,
    };

    const farmData = await farmModel({ _id: farmId });

    let blockData = farmData[0].blocks;
    for (let block of blockData) {
      if (block.blockId === req.body.blockId) {
        let availableSlots = block.blockCapacity - block.currentBirdCount;

        if (availableSlots < birdCount) {
          res.status(400).json({ message: "No Available Spaces for birds" });
        }
      }
    }

    const result = await flockValidation.validateAsync(flockData);

    const flocKData = new flock(result);

    await flocKData
      .save()
      .then(async (resp) => {
        console.log("res", resp);
        let expData = {
          farmId: farmId,
          flockId: resp._id,
          flockPurchase: req.body.purchaseAmount,
        };
        console.log("expenses", expData);
        const finance = new financeModel(expData);
        await finance.save();

        res.status(200).json({ message: "New Batch Added Successfully" });
      })
      .catch((err) => {
        console.log("err", err);
        res.status(404).json({ message: "Batch is not added" });
      });
  } catch (error) {
    console.log("error", error);
    if (error.isJoi === true) {
      res.status(422).json({
        message: error.details.map((detail) => detail.message).join(", "),
      });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const getAllFlocksFarm = async (req, res) => {
  try {
    const farmId = req.user.farmId;
    const fd = await farmModel.find({ _id: farmId });

    const farmData = await flock.find({ farmId: farmId });
    let flockData = [];
    let blocks = fd[0].blocks;
    for (let flk of farmData) {
      for (let block of blocks) {
        if (flk.blockId === block.blockId) {
          flockData.push({
            ...flk._doc,
            blockName: block.blockName,
          });
        }
      }
    }

    if (flockData.length === 0) {
      res.status(404).json({ message: "No Flock Available" });
    } else {
      res.status(200).json({ data: flockData });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFlocksInBlock = async (req, res) => {
  try {
    const farmId = req.user.farmId;

    const farmData = await farmModel.find({ _id: farmId });

    let blocks = farmData[0].blocks;
    let flocksData = [];

    blocks.forEach(async (block) => {
      const batch = await flock.find({ blockId: block.blockId });

      flocksData.push(batch[0]);
    });

    if (flocksData.length === 0) {
      res.status(404).json({ message: "No Flock available in the block" });
    } else {
      res.status(200).json({ message: "Success", data: flocksData });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateExpenses = async (req, res) => {
  try {
    const flockId = req.params.flockId;

    await flock
      .findByIdAndUpdate({ _id: flockId }, { expenses: req.params.expenses })
      .then((resp) => {
        console.log("response", resp);

        res.status(200).json({ message: "Expenses updated successfully" });
      })
      .catch((err) => {
        console.log("error", err);
        res.status(400).json({ message: "Update failed" });
      });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error " });
  }
};

// batchName: {
//   type: String,
//   required: true,
// },
// flockType:{
//     type:String,
//     required:false
// },
// farmId:{
//   type:String,
//   required:true
// },
// birdCount: {
//   type: Number,
//   required: true,
// },
// blockId: {
//   type: Number,
//   required: true,
// },
// startDate: {
//   type: Date,
//   required: true,
// },
// endDate: {
//   type: Date,
// },
// purpose:{
//   type:String
// },
// expenses:{
//   type:Number
// },
// from:{
//   type:String
// }

const updateFlockData = async (req, res) => {
  try {
    endDate;
    let farmId = req.user.farmId;

    let farmData = req.body;

    let query = {};

    if (farmData.endDate) {
      query.endDate = farmData.endDate;
    }

    if (farmData.purpose) {
      query.purpose = farmData.purpose;
    }

    if (farmData.batchName) {
      query.batchName = farmData.batchName;
    }

    if (farmData.birdCount) {
      query.birdCount = farmData.birdCount;
    }

    await flock
      .findByIdAndUpdate({ farmId: farmId }, { $set: query }, { new: true })
      .then((response) => {
        console.log("response", response);
        res.status(200).json({ message: "Flock data updated successfully" });
      })
      .catch((error) => {
        console.log("error", error);

        res.status(400).json({ message: "Update Failed" });
      });
  } catch (error) {
    console.log("error", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addFeed = async (req, res) => {
  try {
    const feedData = req.body;

    const result = await feedHelper.validateAsync(feedData);
console.log("res",result)
    const feed = new feedModel(result);

    await feed
      .save()
      .then((resp) => {
        res.status(200).json({ message: "Feed Added Successfully" });
      })
      .catch((error) => {

        console.log("error",error)
        res.status(400).json({ message: "Failed" });
      });
  } catch (error) {
    console.log("error", error);

    if (error.isJoi) {
      res.status(422).json({ message: "Validation Error" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const getAllFeed = async (req, res) => {
  try {
    //  const farmId=req.user.farmId

    const feedData = await feedModel.find();

    if (feedData.length === 0) {
      res.status(404).json({ message: "No Data Found", data: feedData });
    } else {
      res.status(200).json({ message: "Success", data: feedData });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const flockFeed = async (req, res) => {
  try {
    const farmId = req.user.farmId;

    const result = flockFeedHelper.validateAsync(req.body);

    const feedData=await feedModel.find({_id:req.body.feedId})

    if(feedData[0].stock<req.body.quantityPerDay)
    {
      res.status(400).json({"message":"Feed is out of stock"})
    }

    const flockFeed = new flockFeedModel(result);
    await flockFeed
      .save()
      .then((response) => {
        console.log("response", response);
        res.status(200).json({ message: "Feed is provided to the flock" });
      })
      .catch((error) => {
        console.log("error", error);

        res.status(400).json({ message: "No Feed is provided" });
      });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addFlock,
  getAllFlocksFarm,
  getFlocksInBlock,
  updateExpenses,
  updateFlockData,
  addFeed,
  getAllFeed,
  flockFeed
};
