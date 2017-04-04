var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var GameSchema = new Schema({
  createdAt            : { type: Date, default: Date() },
  updatedAt            : { type: Date, default: Date() },
  gameName             : { type: String, unique: true, required: true },
  gameNumber           : { type: Number, unique: true, required: false },
  userCountMax         : { type: Number, default: 5 }
})

module.exports = mongoose.model('Game', GameSchema)
