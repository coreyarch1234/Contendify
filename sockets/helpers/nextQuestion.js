var Game = require('../../models/game/game.js');
var Question = require('../../models/question/question.js');

module.exports = function(code, index, cb) {
    Game.findOne({ code: code }).populate('questions').exec(function(error, game) {
        if (error) { return error };
        console.log('index: ' + index);
        console.log('Questions: ');
        console.log(game.questions);
        var question = game.questions[index]
        console.log('Next question is: ');
        console.log(question);
        cb(question)
    });
}
