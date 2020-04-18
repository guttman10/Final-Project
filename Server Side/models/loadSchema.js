const mongoose = require('mongoose')

const schema ={
    id: {type:Number, index: 1},
    name:{type:String},
    image:{type:String},
    load:{
        maxCount:{type:Number},
        currCount:{type:Number},
        meanCount:{type:Number},
        suggestion:{type:Array},
        busy:{type:Number}
    }
}
const load_schema = new mongoose.Schema(schema)
mongoose.pluralize(null);
const load        = mongoose.model('data',load_schema)
module.exports      = load
