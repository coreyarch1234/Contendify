var Game = require('../../models/game/game.js');
var Question = require('../../models/question/question.js');
var questionJSON = require('../../question-data/questions.json');

var questionDocs = []
var questions = []
var total = 2;

function saveQuestions(cb) {
    var question = questionDocs.shift();

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

    for (var i = 0; i < total; i++) {
        console.log('Iteration: ' + i)
        var question = new Question({
          body: questionJSON.questions[i].text,
          answer: questionJSON.questions[i].answer,
          game: game._id
        });
        questionDocs.push(question)
        // console.log('Pre-Save: ' + question)
    }

    saveQuestions(function() {
        console.log('Calling you back with new questions')
        cb(questions);
    })



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
