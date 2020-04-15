// npm modules
const express   = require('express')
const morgan    = require('morgan')
const app = express();
//my additional modules
const controller    = require('./controller')
const asyncWrapper  = require('./async.wrapper')
const port = process.env.PORT || 3000;
//establish app()
app.set('port',port);
app.use('/', express.static('./public')); // for API
app.use(
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.set("Content-Type", "application/json");
        next();
    });

//routes
app.get('/load_data', asyncWrapper(controller.getAllLoads));


//run the server
    app.listen(port, () => {
    console.log("App is running on port " + port);
});