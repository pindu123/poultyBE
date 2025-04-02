const joi=require('joi')


const farmRegister=joi.object({

    farmName: joi.string().regex(/^[A-Za-z]+$/).required(),
      farmEstDate: joi.string().optional(),
      farmCapacity:  joi.string().required(),
      farmOwner:joi.string().required(),
      farmSize:  joi.number().required(),
      sizeUnit:joi.string().optional(),
      district: joi.string().required(),
      city: joi.string().required(),
      mandal: joi.string().required(),
      pincode: joi.string().required(),
      village: joi.string().optional(),
      farmType:joi.string().required(),
      phoneNumber:joi.string()    .pattern(/^[6-9][0-9]{9}$/)
      .required(),
      email:joi.string().email().required(),
      password:joi.string().required() .min(5)
      .max(15)
      .pattern(
        new RegExp(
          "^(?=[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?])[A-Z][A-Za-z\\d!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]{7,14}$"
        )
      )
})



module.exports={
    farmRegister
}