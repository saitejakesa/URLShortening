const mongoose=require('mongoose')
const validator=require('validator')

const URLSchema=new mongoose.Schema({
    urlCode:{type:'String'},
    oldURL:{type:'String'},
    newURL:{type:'String'},
    date:{type:'String',default:Date.now}
})

let URLModel=mongoose.model('urls',URLSchema);
module.exports={mongoose,URLModel}