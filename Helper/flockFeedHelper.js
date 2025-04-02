const joi=require('joi')

const flockFeedHelper=joi.object({
    flockId: joi.string().required(),
      feedId: joi.string().required(),
      farmId: joi.string().required(),
      quantityPerDay:joi.string().required(),
      numberOfTimes: joi.number().optional(),
})

module.exports=flockFeedHelper