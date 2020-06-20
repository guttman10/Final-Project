const mongoose = require('mongoose')

const schema ={
    name:{type:String ,index: 1},
    user:{type:String},
    image:{type:String},
    location:{
        latitude: {type:Number},
        longitude: {type:Number},
    },
    subAtt:{type:Array},
    category:{type:String},
}
const load_schema = new mongoose.Schema(schema)
mongoose.pluralize(null);
const load        = mongoose.model('data',load_schema)
module.exports      = load
