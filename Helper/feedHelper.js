const joi=require('joi')

const feedHelper=joi.object({

    feedName: joi.string().required(),
     stock:joi.number().optional(),
     cost:joi.number().optional()
    
})


module.exports=feedHelper