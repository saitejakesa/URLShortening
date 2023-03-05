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
  const baseUrl = "https://url-shorteningbackend-git-frontend-saitejakesa.vercel.app/";
  const urlCode = shortid.generate();
  try{
   let oldurl=req.body.oldURL
     
    console.log(req.body)
    console.log(validUrl.isUri(baseUrl))
    if(!validUrl.isUri(baseUrl)){
      res.send({
        statusCode:401,
        message:"BaseURL is Invalid"
      })
    }
    if(validUrl.isUri(oldURL)){
      let user=await URLModel.findOne({oldURL:req.body.oldURL})
      console.log(user)
    if (!user) {
      let url= await URLModel.create(req.body)
      const shortUrl = baseUrl + '/' + urlCode;
      const oldUser=await URLModel.updateOne({oldURL:oldURL},{urlCode:urlCode})
        res.send({
          statusCode:200,
          longurl:oldURL,
          shortUrl:shortUrl,
          urlCode:urlCode,
          date: new Date()
         })
      
    }
    else{
      console.log("message")
      res.send({
        statusCode:200,
        longurl:oldURL,
        shortUrl:user.urlCode,
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
