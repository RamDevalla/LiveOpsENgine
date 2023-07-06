const express=require("express")
const router=express.Router()
const salt=9;
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const secret="qwertesvsddsvsd"
const {user}=require("../Models/usermodel");



router.post("/signup",async(req,res)=>{
        bcrypt.genSalt(salt,(salterr,saltvalue)=>{
             if(salterr){
                res.status(401).send("Unable to Process")
             }
             else{
                bcrypt.hash(req.body.password,saltvalue,(hasher,hashvalue)=>{
                            if(hasher){
                                res.status(401).send("hash error")
                            }else{
                                user.create({username:req.body.username,password:hashvalue,email:req.body.email,mobile:req.body.mobile})
                            .then((user)=>{res.status(200).send(user)})
                            .catch((err)=>{ res.status(400).send(err.message)})
                            }
                })
             }
        })
        
})

router.post("/signin",async(req,res)=>{
         user.findOne({username:req.body.username})
         .then((user)=>{
                 if(!user){
                    res.status(401).send("user not found")
                 }else{
                    if(!bcrypt.compareSync(req.body.password,user.password)){
                        res.status(401).send("Invalid password")
                    }else{
                        const token =jwt.sign({id:user._id,username:user.username},secret);
                        res.status(200).send({message:"user logged in sucessfully",token:token})
                    }
                 }
         }).catch((err)=>{
                    console.log(err);
         })
})
module.exports=router