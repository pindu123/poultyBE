const { farmRegister } = require("../Helper/farmHelper");
const farmModel = require("../Models/farmModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const farmRegistertion = async (req, res) => {
  try {
    console.log("registration");
    const result = await farmRegister.validateAsync(req.body);

    console.log(result);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(result.password, salt);
    result.password = hashedPassword;

    if (result) {
      const farmsData = await farmModel.find({ email: req.body.email });

      if (farmsData.length != 0) {
        res.status(400).json({ message: "Farm is already registered" });
      } else {
        const farms = new farmModel(result);

        await farms.save();

        res.status(201).json({ Message: "Farm Created Successfully" });
      }
    }
  } catch (error) {
    console.log("eror", error);
    if (error.isJoi === true) {
      res.status(422).json({
        message: error.details.map((detail) => detail.message).join(", "),
      });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const farmLogin = async (req, res) => {
  try {
    const loginData = req.body;

    const farmsData = await farmModel.find({ email: loginData.email });

    if (farmsData.length === 0) {
      req.status(404).json({ message: "Farm is not Registered" });
    } else {
      const isMatch = await bcrypt.compare(
        loginData.password,
        farmsData[0].password
      );
      if (isMatch) {
        const token = jwt.sign(
          {
            farmId: farmsData[0]._id,
            farmName: farmsData[0].farmName,
            farmType: farmsData[0].farmType,
          },
          process.env.secretKey,
          { expiresIn: "1d" }
        );

        res.status(200).json({ message: "Login Successfull", token: token });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const farmBlocks = async (req, res) => {
  try {
    console.log(req.user);
    const farmId = req.user.farmId;
    const blocksData = req.body;

    const farmData = await farmModel.find({ _id: farmId });

    let farmBlocks = farmData[0].blocks;

    if (farmBlocks.length === 0) {
      blocksData.blockId = 1;
      await farmModel
        .findByIdAndUpdate({ _id: farmId }, { blocks: blocksData })
        .then((resp) => {
          console.log("response", resp);
          res
            .status(200)
            .json({ message: "Block wise data is updated successfully" });
        })
        .catch((err) => {
          console.log("error", err);
          res.status(500).json({ message: "Internal Server Error" });
        });
    } else {
      let blockId;
      let blockCap = blocksData.blockCapacity;
      farmBlocks.forEach((item) => {
        blockId = item.blockId;
        blockCap = blockCap + item.blockCapacity;
      });
      blocksData.blockId = blockId + 1;
      farmBlocks.push(blocksData);
      if (blockCap > farmData[0].farmCapacity) {
        res.status(400).json({
          message: "This block capacity is exceeding the farm capacity",
        });
      } else {
        console.log("farm blocks", farmBlocks);
        await farmModel
          .findByIdAndUpdate({ _id: farmId }, { blocks: farmBlocks })
          .then((resp) => {
            console.log("response", resp);
            res
              .status(200)
              .json({ message: "Block wise data is updated successfully" });
          })
          .catch((err) => {
            console.log("error", err);
            res.status(500).json({ message: "Internal Server Error" });
          });
      }
    }
  } catch (error) {
    console.log("error", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBlockData = async (req, res) => {
  try {
    const farmId = req.user.farmId;

    const farmsData = await farmModel.find({ _id: farmId }, { password: 0 });

    let blockData = farmsData[0].blocks;

    if (blockData.length !== 0) {
      res.status(200).json({ data: blockData });
    } else {
      res
        .status(404)
        .json({ message: "No Block Data is Added yet", data: blockData });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFormData = async (req, res) => {
  try {
    const farmId = req.user.farmId;

    const farmData = await farmModel.find({ _id: farmId }, { password: 0 });

    let blockData = farmData[0].blocks;

    let totalCount = 0;

    blockData.forEach((item) => {
      totalCount = item.currentBirdCount + totalCount;
    });

    let poultryData = {
      ...farmData[0]._doc,
      avilableBirdCount: totalCount,
    };

    if (farmData.length === 0) {
      res.status(404).json({ message: "Farm data not found" });
    } else {
      res.status(200).json({ message: "Success", data: poultryData });
    }
  } catch (error) {
    console.log("error", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
};

const editFormData = async (req, res) => {
  try {
    const data = req.body;
    const farmId = req.user.farmId;
    let query = {};

    if (data.farmName) {
      query.farmName = data.farmName;
    }
    if (data.farmCapacity) {
      query.farmCapacity = data.farmCapacity;
    }

    if (data.farmType) {
      query.farmType = data.farmType;
    }

    if (data.farmSize) {
      query.farmSize = data.farmSize;
    }

    if (data.email) {
      query.email = data.email;
    }
    if (data.phoneNumber) {
      query.phoneNumber = data.phoneNumber;
    }
    await farmModel
      .findByIdAndUpdate({ _id: farmId }, { $set: query }, { new: true })
      .then((resp) => {
        console.log("response", resp);
        res.status(200).json({ message: "farm details updated successfully" });
      })
      .catch((error) => {
        console.log("err", error);

        res.status(500).json({ message: "Farm Details Upadte Failed" });
      });
  } catch (error) {
    console.log("error", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const data = req.body;
    const farmData = await farmModel.find({ email: data.email });

    await farmModel
      .findByIdAndUpdate({ _id: farmData[0]._id }, { password: data.password })
      .then((resp) => {
        console.log("response", resp);
        res.status(200).json({ message: "Password Updated Successfully" });
      })
      .catch((err) => {
        console.log("error", err);
        res.status(400).json({ message: "Passwod updation failed" });
      });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateBlockData = async (req, res) => {
  try {
    const farmId = req.user.farmId;

    const data = req.body;

    const farmData = await farmModel.find({ _id: farmId });

    let blocksData = farmData[0].blocks;

    for (let block of blocksData) {
      if (block.blockId === data.blockId) {
        if (data.blockCapacity) {
          block.blockCapacity = data.blockCapacity;
        }

        if (data.currentBirdCount) {
          block.currentBirdCount = data.currentBirdCount;
        }
        if (data.blockType) {
          block.blockType = data.blockType;
        }

        if (data.blockName) {
          block.blockName = data.blockName;
        }
      }
    }

    await farmModel
      .findByIdAndUpdate({ _id: farmId }, { blocks: blocksData })
      .then((resp) => {
        res
          .status(200)
          .json({ message: "Block wise data updated successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Update Failed" });
      });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAvilableBlocks = async (req, res) => {
  try {
    const farmId = req.user.farmId;

    const farmsData = await farmModel.find({ _id: farmId });

    const blockData = farmsData[0].blocks;

    let avilableBlocks = [];

    for (let block of blockData) {
      if (block.currentBirdCount < block.blockCapacity) {
        avilableBlocks.push({
          ...block._doc,
          avilableGap:String( block.blockCapacity - block.currentBirdCount),
        });
      }
    }

    if (avilableBlocks.length === 0) {
      res
        .status(404)
        .json({ message: "No Available Blocks", data: avilableBlocks });
    } else {
      res.status(200).json({ message: "success", data: avilableBlocks });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  farmRegistertion,
  farmLogin,
  farmBlocks,
  getBlockData,
  getFormData,
  editFormData,
  updatePassword,
  updateBlockData,
  getAvilableBlocks,
};
