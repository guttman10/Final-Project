const mongoose = require('mongoose')

const schema = {
  name: { type: String, index: 1 },
  user: { type: String },
  image: { type: String },
  location: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  attractions: { type: Array },
  category: { type: String }
}
const loadSchema = new mongoose.Schema(schema)
mongoose.pluralize(null)
const load = mongoose.model('data', loadSchema)
module.exports = load
