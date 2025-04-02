const joi=require('joi')


const flockValidation=joi.object({

    batchName:joi.string().required(),
      birdCount:joi.string().required(),
       farmId:joi.string().required(),
        flockType:joi.string().optional(),
        blockId: joi.number().required(),
       startDate: joi.date().required(),
       purpose:joi.string().optional(),
       flockfrom:joi.string().optional()
})


module.exports=flockValidation