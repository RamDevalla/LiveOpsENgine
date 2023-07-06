const express=require("express");
const mongoose=require("mongoose");
const bodyparser=require("body-parser");
const userroute=require("./Routes/user.js");
const offerroute=require("./Routes/offer.js")
const {MONGOURI} = "./key.js";
const port= 8080;
const app=express();

mongoose.connect(MONGOURI).then(()=>{
    console.log("connected sucessfully");
}).catch((err)=>{
    console.log(err)
})
app.use(bodyparser.json())
app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})

 app.use("/user",userroute);
app.use("/offer",offerroute);
