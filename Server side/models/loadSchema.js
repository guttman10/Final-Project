const mongoose = require('mongoose')

const schema ={
   // _id: mongoose.Types.ObjectId,
    name:{type:String, index:1},
    load:{
        maxCount:{type:Number},
        currCount:{type:Number},
        meanCount:{type:Number},
       busy:{type:Number},
    }
}
const load_schema = new mongoose.Schema(schema)
mongoose.pluralize(null);
const load        = mongoose.model('data',load_schema)
module.exports      = load
