const { required } = require('joi')
const mongoose=require('mongoose')

const finance=new mongoose.Schema({

    farmId:{
        type:String,
        required:true
    },
    flockId:{
        type:String,
        required:true
    },
   flockPurchase:{
    type:Number,
    },
   flockFeedAmount:{
    type:Number,
    },
   flockMedicalExp:{
    type:Number,
    },
   otherExp:{
    type:Number,
    },
   eggsIncome:{
   type:Number
   },
   meatIncome:{
    type:Number
   },
   flockIncome:{
    type:Number
   }
})


const financeModel=mongoose.model("finance",finance)

module.exports=financeModel