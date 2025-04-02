const joi=require('joi')

const financeHelper=joi.object({
    farmId: joi.string().required(),
    flockId:joi.string().required(),
   flockPurchase:joi.number().required(),
   flockFeedAmount:joi.number().optional(),
   flockMedicalExp:joi.number().optional(),
   otherExp:joi.number().optional(),
   eggsIncome: joi.number().optional(),
   meatIncome:joi.number().optional(),
   flockIncome:joi.number().optional()
})

module.exports=financeHelper
