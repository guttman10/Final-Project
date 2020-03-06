// npm modules
const express   = require('express')
const morgan    = require('morgan')

//my additional modules
const controller    = require('./controller')
const asyncWrapper  = require('./async.wrapper')

//establish app()
const app   = express()
const port  = process.env.PORT || 3000

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));


//routes
app.get('/load_data', asyncWrapper(controller.getAllLoads));
//app.post('/player',asyncWrapper(controller.UpdateNumOfWinnings));
//app.get('/player/:numOfWinnings&:age', asyncWrapper(controller.getPlayersByWinningsAndAge));


//run the server
app.listen(port, 
    ()=>console.log('Express server ready for requests on: ' ,port))



