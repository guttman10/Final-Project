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
    if (req.body.user.mode === 0){ //updating category

            load.findOneAndUpdate(
                {name: req.body.user.name},
                {category: req.body.user.category},
                {upsert: true},
                function (err, doc) {
                    console.log(doc);
                }
            )
        }
        else if(req.body.user.mode === 1) // adding a new site
        {
            console.log("hey")
        let user = {
                user:req.body.user.user,
                name:req.body.user.name,
                image:req.body.user.image,
                location:req.body.user.location,
                category:req.body.user.category,
            };
       load.create(user)
        }
        else if (req.body.user.mode === 2){ // adding a new sub attraction
            console.log("new")
            let temp = req.body.user.subAtt
            temp.push({
                name: req.body.user.name,
                image: req.body.user.image,
                load: {
                    maxCount:1,
                    currCount:0,
                    meanCount:0,
                    suggestion: [0,0],
                    busy:0
                }
            })

            load.findOneAndUpdate(
                {name: req.body.user.attName},
                {subAtt: temp},
                {upsert: true},
                function (err, doc) {
                    console.log(doc);
                }
            )
        }
    }

}
