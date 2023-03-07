var express = require('express');
var router = express.Router();
const {mongoose,URLModel} = require('../dbSchema')
const {mongodb,dbName,dbUrl} = require('../dbConfig')
const validUrl = require('valid-url');
const shortid = require('shortid');
const env=require('../environment')

router.post('/shorturl',async(req,res)=>{
  mongoose.set("strictQuery", false);
  await mongoose.connect(dbUrl)
  const {oldURL} = req.body;
  try{
   let oldurl=req.body.oldURL
     
    console.log(req.body)
    if(validUrl.isUri(oldURL)){
      let user=await URLModel.findOne({oldURL:req.body.oldURL})
      console.log(user)
      if(user)return res.send({
        statusCode:200,
        url: user
      })
      else{
        let url= await URLModel.create(req.body)
        res.send({
          statusCode:200,
          url:url
          
        })
      }
    
  }
    else{
      res.send({
        statusCode:401,
        message:"Invalid Login URL"
      })
    }

  }
  catch(err){
    console.log(err)
    res.send({statusCode:400,message:"Internal Server Error",err})
  }
})



module.exports = router;
