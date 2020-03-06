const mongoose = require('mongoose')

const schema ={
   // _id: mongoose.Types.ObjectId,
    name:{type:String, index:1},
    load:{type:Number},
    //age:{type:Number, required:true},
   // weight:{type:Number, required:true},
    //numOfWinnings:{type:Number},
   // detailes:{
     //   competitionType:{type:String},
       // originCountry:{type:String}
    //}
}
const load_schema = new mongoose.Schema(schema)
mongoose.pluralize(null);
const load        = mongoose.model('data',load_schema)
module.exports      = load
