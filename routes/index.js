var express = require('express');
var router = express.Router();
const {mongoose,URLModel} = require('../dbSchema')
const {mongodb,dbName,dbUrl} = require('../dbConfig')

/* GET home page. */
router.get('/:code',async(req,res)=>{
  try {
    await mongoose.connect(dbUrl)
    const url = await URLModel.findOne({ urlCode: req.params.code });
    console.log(url)

    if (url !=null) {
      console.log("arrived")
      res.json(url.oldURL);
    } else {
      res.send({
        statusCode:404,
        message:"No url found"
      })
      
    }
  } catch (err) {
    console.error(err);
    res.send({
      statusCode:404,
      message:"Internal Server Error"
    })
  }
})

module.exports = router;
