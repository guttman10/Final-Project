const mongoose      = require('mongoose')
const consts        = require('./consts')
const load        = require('./loadSchema')
const connection    = require('./db')


module.exports={
   async getAllLoads(req, res, next){

        const result = await load.find({})
        if(result)
            res.json(result)
        else
            res.status(404).send('not found')
    },

   async UpdateNumOfWinnings(req,res,next){

        const {playerID=null,numOfWinnings=null}=req.body
        const result = await load.findOneAndUpdate({playerID},{$set:{numOfWinnings}},(err,updatedPlayer)=>{
            if(err){
                console.log("could not update load number of winnings")
            }
            console.log(updatedPlayer)
        });

        if(result)
            res.json(result)
        else
            res.status(404).send('Not Found')
    },

    async getPlayersByWinningsAndAge(req,res,next){

        const {numOfWinnings= null, age =null} =req.params
        const result = await load.find({numOfWinnings,age},(err,sortedPlayer)=>{
            if(err){
                console.log("could not find load")
            }
            console.log(sortedPlayer)
        });
        if(result) 
            res.json(result)
        else
            res.status(404).send('not found')
    }

}
