var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Will contain a name and a game code along with a question array.
var GameSchema = new Schema({
  createdAt            : { type: Date, default: Date() },
  updatedAt            : { type: Date, default: Date() },
  name                 : { type: String, unique: false, required: true },
  code                 : { type: String, unique: true, required: true },
  questions            : [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

module.exports = mongoose.model('Game', GameSchema);
