const express=require('express')
const { farmRegistertion, farmLogin } = require('../controller/farmController')

const noAuth=express.Router()


noAuth.post("/register",farmRegistertion)

noAuth.post("/login",farmLogin)


module.exports=noAuth