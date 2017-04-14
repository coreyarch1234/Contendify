var questions = require('./testdata')

class Game {
  constructor(id, name) {
    this.id = id
    this.name = name
    this.participants = []
    this.currentQuestion = null
    this.currentAnswers = []
  }

  saveToDatabase() {
    // save relevant data to the db
  }


  // prepare the game for a new question
  reset() {
    this.currentQuestion = questions.questions[0]
    this.currentAnswers = []
  }

  addUser(sockId, score = 0) {
    var newUser = {
      sockId: sockId,
      score: score
    }

    this.participants.push(newUser)
  }

  removeUser(sockId) {
    this.participants = this.participants.filter((user) => {
      return user.sockId === sockId
    })
  }

  // check whether user is a participant
  findUser(sockId) {
    return true
  }

  // add a new false answer to the current question
  submitAnswer(sockId, answer) {
    if (this.findUser(sockId)) {
      var newAnswer = {
        by: sockId,
        text: answer
      }

      this.currentAnswers.push(newAnswer)
    }
  }

  // check whether answer is correct
  answerQuestion(sockId, answer) {
    if (this.findUser(sockId)) {
      if (answer === questions[this.currentQuestion].answer) {
        return true
        this.increaseScore(sockId)
      }
      //TODO: increase submitters score??
      return false
    }
  }

  // increase the score of the specified player
  increaseScore(sockId) {
    this.participants = this.participants.map((user) => {
      if(user.sockId === sockId) {
        user.score++
      }
    })
  }
}

module.exports = Game
