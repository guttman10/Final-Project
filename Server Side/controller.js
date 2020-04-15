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



}
