var Game = require('../../models/game/game.js');
var Question = require('../../models/question/question.js');
var questionJSON = require('../../question-data/questions.json');

var questionDocs = []
var questions = []
var total = 6;

function saveQuestions(cb) {
    var question = questionDocs.shift();

    question.save(function(error, saved) {
        if (error) { return error };

        questions.push(saved);
        total = total - 1
        if (total > 0) {
            saveQuestions(cb);
        } else {
            console.log('All docs have been saved!');
            cb();
        }
    });
}


module.exports = function(game, cb) {
    var questionArray = [];
    // Future: Generate random questions

    for (var i = 0; i < total; i++) {
        console.log('Iteration: ' + i)
        var question = new Question({
          body: questionJSON.questions[i].text,
          answer: questionJSON.questions[i].answer,
          game: game._id
        });
        questionDocs.push(question)
        console.log('Pre-Save: ' + question)
    }

    saveQuestions(function() {
        console.log('Calling you back with new questions')
        cb(questions);
    })
}
