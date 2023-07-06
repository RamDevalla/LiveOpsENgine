const express=require("express")
const router=express.Router()
const jwt=require("jsonwebtoken")
const secret="sdcsdsddmdaugdtrs"
const {Offer}=require("../Models/offermodel");
const getdata = require('../Middleware/getid');


const getuserbytoken=(token)=>{
   return new Promise((resolve,reject)=>{
         if(token){
            let userdata;
            try{
                const userdata=jwt.verify(token,secret);
                resolve(userdata);
            }catch(err){
                reject ("Invalid Token")
            }
         }else{
            reject("Token Not Found")
         }
    })
}
router.get("/", (req,res)=>{
    Offer.find()
    .then(data=>{
      res.status(200).json(data)
    }).catch(err=>{
      console.log(err)
    })
})

router.get('/:id',getdata, (req, res)=>{
  res.json(res.post)
})

router.post("/list",async(req,res)=>{
    Offer.find().then((offers)=>{
        
         offers.filter((offer)=>{
            const rules=offer.target.split("and")
          rules.forEach((rule)=>{
                  let rulekey={}
                  if(rule.includes(">")){
                    rulekey={key:rule.trim().split(">")[0].trim(),value:parseInt(rule.trim().split(">")[1])}
                    if(req.body[rulekey.key]>rulekey.value){
                        validoffers.push(offer)
                    }
                  }else{
                    rulekey={key:rule.trim().split("<")[0],value:rule.trim().split("<")[1]}
                    if(req.body[rulekey.key]<rulekey.value){
                    validoffers.push(offer)
                }
                  }
                
          })
          res.status(200).send(validoffers);
    }).catch((err)=>{
        console.log(err);
    })
})
});

router.post("/create",async(req,res)=>{
          getuserbytoken(req.headers.authorization).then((user)=>{
            const offerdata={...req.body}
            Offer.create({...req.body,username:user.username}).then((offer)=>{
                res.status(400).send(offer)
            }).catch((err)=>{
                res.status(401).send({message:err.message})
            })
          }).catch((err)=>{
            res.status(400).send(err)
          })
})

router.put('/:id', getdata, async(req, res)=>{
  const {offer_id,offer_title,offer_description, offer_image,target,pricing } = req.body

  if(offer_id != null|| pricing != null){
      res.post.offer_id = offer_id,
      res.post.offer_title = offer_title,
      res.post.offer_description = offer_description,
      res.post.offer_image = offer_image,
      res.post.target = target,
      res.post.pricing = pricing
  }
  try {
      const updatedPost = await res.post.save()
      res.json(updatedPost)

  } catch (error) {
          return res.status(400).json({message : error.message})
  }

})

// Deleting an existing Offer with id ======================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

router.delete('/:id',getdata, async (req, res)=>{
  try {
      const id = res.post._id
      await Offer.findOneAndDelete(id);
      res.json({message : " Offer Deleted"})

  } catch (error) {
      return    res.status(500).json({message : error.message})
  }

})


module.exports=router;