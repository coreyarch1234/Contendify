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
    console.log("THE TOTAL IS BITCCCCHHHH: " + total);
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
    total = 2;
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
        // console.log('Pre-Save: ' + question)
    }

    // saveQuestions(function() {
    //     console.log('Calling you back with new questions')
    //     cb(questions);
    // })



    // for (var i = 0; i < numQuestions; i++) {
    //     console.log('Iteration: ' + i)
    //     var data = new Question({
    //       body: questionJSON.questions[i].text,
    //       answer: questionJSON.questions[i].answer,
    //       game: game._id
    //     });
    //     console.log('Pre-Save: ' + data)
    //
    //     data.save(function(error, question) {
    //         console.log("Saving.....")
    //         // console.log('our i : ' + i)
    //         if (error){ return error };
    //
    //         questionArray.push(question);
    //
    //         if (i == 1) {
    //             console.log('Calling you back with new questions')
    //             cb(questionArray);
    //         } else {
    //             console.log("Saved!");
    //             console.log("Building question '" + i + "' ....");
    //         }
    //
    //     });
    // }
}
