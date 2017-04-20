var Game = require('../../models/game/game.js');
var Question = require('../../models/question/question.js');
var questionJSON = require('../../question-data/questions.json');

module.exports = function(game, cb) {
    var questionArray = [];
    var numQuestions = 1;
    // Future: Generate random questions

    for (var i = 0; i < numQuestions; i++) {
        console.log('our i : ' + i)
        var data = new Question({
          body: questionJSON.questions[i].text,
          game: game._id
        });

        data.save(function(error, question) {
            console.log('our new question is: ' + question)
            // console.log('our i : ' + i)
            if (error){ return res.status(300) };
            questionArray.push(question);
            // if (i == 1) {
            //     cb(questionArray);
            // }
            cb(questionArray);
        });
    }
}
