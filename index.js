const express=require('express')

const mongoose=require('mongoose')

const cors=require('cors')

require('dotenv').config()


const bodyparser=require('body-parser')
const { farmRegistertion } = require('./controller/farmController')
 const { verifyJwt } = require('./Service/middle')
const noAuth = require('./Routes/noAuth')
const farmRoutes = require('./Routes/farmRoutes')
const flockRoutes = require('./Routes/flockRoutes')
 




const app=express()

app.listen(3001,()=>{
    console.log("server is running on port 3001")
})




app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
app.options("*", cors());


app.use(bodyparser.json())



app.use("/",noAuth)


app.use("/farm",verifyJwt,farmRoutes)

app.use("/flock",verifyJwt,flockRoutes)

mongoose.connect(process.env.mongourl, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 300000,   
    socketTimeoutMS: 45000,   
    tlsAllowInvalidCertificates: true,
   }).then((resp)=>{
    console.log("Db Connected")
   }).catch((err)=>{
    console.log("error",err)
   })