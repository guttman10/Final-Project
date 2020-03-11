const mongoose = require('mongoose');
const Idea = require('/FPShenkar/Final-Project/Server side/models/loadSchema'); // access the MODEL
exports.getData = (req, res) => {
    Idea.find({})
        .then(docs => {
            console.log(docs);
            return res.json(docs);
        })
        .catch(err => console.log(`query error: ${err}`))
};