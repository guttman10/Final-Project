const mongoose      = require('mongoose')
const load        = require('./models/loadSchema')
const connection    = require('./db')


module.exports={
   async getAllLoads(req, res, next){

        const result = await load.find({})
        if(result)
            res.json(result)
        else
            res.status(404).send('not found')
    },
    async getPrediction(req, res, next){

        const csvFilePath='./file/idkreact.csv'
        const csv=require('csvtojson')
        csv()
            .fromFile(csvFilePath)
            .then((jsonObj)=>{
                console.log(jsonObj);
            })
        const result=await csv().fromFile(csvFilePath)
        if(result)
            res.json(result)
        else
            res.status(404).send('not found')
    },



}
