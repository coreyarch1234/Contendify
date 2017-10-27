var Game = require('../../models/game/game.js');
var Question = require('../../models/question/question.js');
var Answer = require('../../models/answer/answer.js');
var questionJSON = require('../../question-data/questions.json');

var questionDocs = []
var questions = []
var total = 0;

function saveQuestions(cb) {
    var question = questionDocs.shift();
    console.log("THE QUESTION JUST CREATED IS: " + question);
    question.save(function(error, saved) {
        if (error) { return error };

        questions.push(saved);

        if (--total) {
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
    total = questionJSON.questions.length;
    console.log("THE TOTAL IS: " + total);
    for (var i = 0; i < total; i++) {
        console.log('Iteration: ' + i)
        var question = new Question({
          body: questionJSON.questions[i].text,
          answer: questionJSON.questions[i].answer,
          game: game._id
        });
        console.log("THE QUESTION JUST CREATED IS: " + question);
        questionDocs.push(question)
        if (i == total - 1){
            saveQuestions(function() {
                console.log('Calling you back with new questions')
                cb(questions);
            })
        }
    }

}
