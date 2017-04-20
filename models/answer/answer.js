var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Will contain a name and a game code along with a question array.
var AnswerSchema = new Schema({
  createdAt            : { type: Date, default: Date() },
  updatedAt            : { type: Date, default: Date() },
  body                 : { type: String, required: true },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  socketId             : { type: String }
});

module.exports = mongoose.model('Answer', AnswerSchema);
