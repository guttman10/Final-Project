const mongoose = require('mongoose')
const load = require('./models/loadSchema')
const connection = require('./db')
mongoose.set('useFindAndModify', false)

module.exports = {
  async getAllLoads (req, res, next) {
    const result = await load.find({})
    if (result) { res.json(result) } else { res.status(404).send('not found') }
  },
  async add (req, res, next) {
    if (req.body.sentData.mode === 0) { // updating category
      load.findOneAndUpdate(
        { name: req.body.sentData.name },
        { category: req.body.sentData.category },
        { upsert: true },
        function (err, doc) {
          if (err) {
            res.status(400).send({
              message: err
            })
          }
        }
      )
      res.end('worked')
    } else if (req.body.sentData.mode === 1) { // adding new site
      const newData = {
        user: req.body.sentData.user,
        name: req.body.sentData.name,
        image: req.body.sentData.image,
        location: req.body.sentData.location,
        category: req.body.sentData.category
      }
      load.create(newData)
      res.end('worked')
    } else if (req.body.sentData.mode === 2) { // adding new attraction
      const tempAttraction = req.body.sentData.attractions
      tempAttraction.push({
        name: req.body.sentData.name,
        image: req.body.sentData.image,
        load: {
          maxCount: 1,
          currCount: 0,
          suggestion: [0, 0]
        }
      })

      load.findOneAndUpdate(
        { name: req.body.sentData.attName },
        { attractions: tempAttraction },
        { upsert: true },
        function (err, doc) {
          if (err) {
            res.status(400).send({
              message: err
            })
          }
        }
      )
      res.end('worked')
    }
  }

}
