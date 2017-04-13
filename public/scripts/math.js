//Hold questions and answers in a key value pair to be used in games
var questions = {
    "One": ["What is the quadratic formula?", "{-b \\pm \\sqrt{b^2-4ac} \\over 2a}"]
};

var getData = function(questionNumber){
    return questions[questionNumber][1];
};
