var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Will contain the question text and will have an answer array
var QuestionSchema = new Schema({
  createdAt            : { type: Date, default: Date() },
  updatedAt            : { type: Date, default: Date() },
  body                 : { type: String, unique: false, required: true },
  game: {
      type: Schema.Types.ObjectId,
      ref: 'Game'
  }
});

module.exports = mongoose.model('Question', QuestionSchema);
