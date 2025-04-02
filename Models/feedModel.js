const mongoose = require("mongoose");

const feed = new mongoose.Schema({
 feedName:{
    type:String,
    required:true
 },
 stock:{
    type:Number,
    required:true 
 },
 cost:{
    type:Number
 }

}, { timestamps: true });


const feedModel=mongoose.model("feed",feed)

module.exports=feedModel