# contendify-


// if user clicks answer
  // get their socket id
  // find their user id if any in teh game.players dict
  // if user id exists
    // check if chosen option is correct answer
    // if correct
      // display they were correct
  // else
    // do something



  // on answer selected
    // update view with data

  // when user clicks asnwer
    // if not everyone has answered
      // emit answer selected
    //





  // on answer selected
    // set socket id : true bc they answered question
    // emit answer selected with data

//Current Task
// On game page, show question text and options text.
// When a user clicks on an option, grab the option text and the socket id.
// Emit the socket id and the option text to server and compare with actual answer.
// If they got it right, update view with "correct text" and if they got it wrong, update with "wrong text"
//
// Key lessons: Obtain socket id and option text and pass it around + manipulate

// addl' Task
// if user is last one left, take eveyrone to next question
// else update everyone to know that another persom answered

Tasks:
1) Find a place to store question and options text
2) Make it possible to grab socket id and options text once a user clicks on an options
3) Emit socket id and options text to server
// 4) create max user count and increment as people answer
4) Update view accordingly
