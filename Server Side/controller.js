const mongoose      = require('mongoose')
const load        = require('./models/loadSchema')
const connection    = require('./db')
mongoose.set('useFindAndModify', false);


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
        const csv= require('csvtojson')
        csv()
        const result=await csv().fromFile(csvFilePath)
        if(result)
            res.json(result)
        else
            res.status(404).send('not found')
    },
    async add(req, res, next) {
       console.log(req.body.user.id)
        console.log(req.body.user.category)
        console.log("hello")
        //let Load = new load({$set:req.body})
       // Load.save()
        load.findOneAndUpdate(
            {id: req.body.user.id},
            {category: req.body.user.category},
            {upsert: true},
            function (err, doc) {
                console.log(doc);
            }
        )

    }

}
