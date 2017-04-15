var questions = require('./testdata')

class Game {
  // constructor(id, name) {
  //   this.id = id
  //   this.name = name
  //   this.participants = []
  //   this.currentQuestion = null
  //   this.currentAnswers = []
  // }

  constructor(name) {
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
      if (user.sockId === sockId) {
        user.score++
      }
    })
  }

  // ####GET GAME STATE####
  // gets the game state; If there are no answers, the game is currently in the submission phase
  // -> allow users to submit their fake answers
  fetchCurrentGameState(sockId) {
    if (this.findUser(sockId)) {
      var answers = this.populateAnswers()
      var gameState = {
        question: questions[this.currentQuestion].text,
        answers: answers
      }
    }
  }

  // #### HELPERS ####

  // return an array of answers if all are there, else return null
  populateAnswers() {
    if (this.currentAnswers.length === this.participants.length) {
      var answers = []
      this.currentAnswers.forEach((answer) => {
        answers.push(answer.text)
      })
      return answers
    }
    return null
  }
}

module.exports = Game
