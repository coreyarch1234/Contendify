var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var GameSchema = new Schema({
  createdAt            : { type: Date, default: Date() },
  updatedAt            : { type: Date, default: Date() },
  gameName             : { type: String, unique: false, required: true },
  userCountMax         : { type: Number, default: 5 }
})

module.exports = mongoose.model('Game', GameSchema)

// gameNumber           : { type: Number, required: true },
