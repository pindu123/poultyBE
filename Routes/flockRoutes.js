const express = require("express");
const {
  addFlock,
  getAllFlocksFarm,
  getFlocksInBlock,
  updateExpenses,
  updateFlockData,
  addFeed,
  getAllFeed,
  flockFeed,
} = require("../controller/flockController");

const flockRoutes = express.Router();

flockRoutes.post("/addFlock", addFlock);

flockRoutes.get("/getAllFlocksFarm", getAllFlocksFarm);

flockRoutes.get("/getFlocksInBlock", getFlocksInBlock);

flockRoutes.put("/updateExpenses", updateExpenses);


flockRoutes.put("/updateFlockData",updateFlockData);

 
flockRoutes.post("/addFeed",addFeed)


flockRoutes.get("/getAllFeed",getAllFeed)


flockRoutes.get("/flockFeed",flockFeed)

module.exports = flockRoutes;
