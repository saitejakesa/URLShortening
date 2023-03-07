const mongoose=require('mongoose')
const validator=require('validator')
const shortId = require('shortid')

const URLSchema=new mongoose.Schema({
    urlCode:{type:'String', default:shortId.generate, required:true},
    oldURL:{type:'String'},
    date:{type:'String',default:Date.now}
})

let URLModel=mongoose.model('urls',URLSchema);
module.exports={mongoose,URLModel}