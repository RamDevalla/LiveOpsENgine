const post = require('../Models/offer-schema')

async function getid(req, res, next){
let post 
try{
    post = await Post.findById(req.params.id)
    if(!post){
      return  res.status(404).json({message : "Unable to find Data"})
    }
}catch(error){
    return res.status(500).json({message : error.message})
}
    res.post = post
    next()

}

module.exports = getid;