const mongoose = require('mongoose')

const schema ={
    _id: {type:String, index: 1},
    name:{type:String},
    user:{type:String},
    image:{type:String},
    location:{
        latitude: {type:Number},
        longitude: {type:Number},
    },
    load:{
        maxCount:{type:Number},
        currCount:{type:Number},
        meanCount:{type:Number},
        suggestion:{type:Array},
        busy:{type:Number}
    },
    manager:{type:Boolean},
    category:{type:String},
}
const load_schema = new mongoose.Schema(schema)
mongoose.pluralize(null);
const load        = mongoose.model('data',load_schema)
module.exports      = load
