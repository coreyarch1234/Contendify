var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  createdAt            : { type: Date, default: Date() },
  updatedAt            : { type: Date, default: Date() },
  name                 : { type: String, unique: false, required: true },
  code                 : { type: String, unique: false, required: true }
});

module.exports = mongoose.model('Game', GameSchema);
