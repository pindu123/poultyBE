const express = require("express");
const {
  farmBlocks,
  getBlockData,
  getFormData,
  editFormData,
  updatePassword,
  updateBlockData,
  getAvilableBlocks,
} = require("../controller/farmController");

const farmRoutes = express.Router();

farmRoutes.put("/addBlocks", farmBlocks);

farmRoutes.get("/getBlockData", getBlockData);

farmRoutes.get("/getFormData", getFormData);

farmRoutes.put("/editFormData", editFormData);

farmRoutes.put("/updatePassword", updatePassword);

farmRoutes.put("/updateBlockData",updateBlockData)


farmRoutes.get("/getAvilableBlocks",getAvilableBlocks)

module.exports = farmRoutes;
