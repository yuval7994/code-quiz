// declaration variables
var questionEl = document.getElementById("question-title");
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitButton = document.getElementById("submit");
var startButton = document.getElementById("start");
var doneButton = document.getElementById("done");
var endScreenEl = document.getElementById("end-screen");
var currentQuestion = 0;
var timeLeft = 60;


//var time = questions.length * 15;
var timeInterval;
const HS = JSON.parse(localStorage.getItem("score")) || []
//highscore variables
var highscoresEl = document.getElementById("highscores");
var highscores = [0,0,0,0];
var highscoreNames = ["?","?","?","?"]
var highscore1 = document.querySelector(".highscore1");
var highscore2 = document.querySelector(".highscore2");
var highscore3 = document.querySelector(".highscore3");
var highscore4 = document.querySelector(".highscore4");
var playerscore = 0;
startButton.addEventListener("click", function (event) {
  event.preventDefault();
  startQuiz();
  questionDisplay();
}); 

doneButton.addEventListener("click", function (event) {
  event.preventDefault(); 
  startQuiz();

});

function startQuiz() {
  playerscore = 0;
  // hide start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
  // un-hide questions section
  questionsEl.removeAttribute("class");
  countdown();
}
function countdown() {
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + " seconds remaining";
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + " second remaining";
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = "";
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // Call the `displayMessage()` function
      questionsEl.setAttribute("class", "hide");
      quizEnd();
    }
  }, 1000);
}
function quizEnd() {
  // stop timer
  clearInterval(timeInterval);
  // show end screen
  endScreenEl.removeAttribute("class");
  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = playerscore;
  // hide questions section
  questionsEl.setAttribute("class", "hide");
}
function highScoreDisplay() {
  highscoresEl.removeAttribute("class");
  endScreenEl.setAttribute("class", "hide");
  for(let i = 0; i < HS.length; i++){
    highscoresEl.innerHTML += `<li>${HS[i]}</li`
  }
}


submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    HS.push(playerscore)

    localStorage.setItem("score", JSON.stringify(HS))
    highScoreDisplay(); 
});

// displays the question and answers
function questionDisplay() {
  if (currentQuestion === questions.length) {
    // end quiz
    quizEnd();
  }
  if (time <= 0) {
    quizEnd();
  }else{
  }

  questionEl.innerText = questions[currentQuestion].title;
  choicesEl.innerHTML = "";
 
  for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
    // declaring the answer button
    var answerButton = document.createElement("button");
    answerButton.innerText = questions[currentQuestion].choices[i];
    choicesEl.appendChild(answerButton);
    // displays the next question upon click
    answerButton.addEventListener("click", function (event) {
      event.preventDefault();
      correctAnswer(event.target.innerText);
      currentQuestion++;
      questionDisplay();
    });
  }
}
function correctAnswer(chosen) {
  //check if user got wrong or correct answer
  if (chosen !== questions[currentQuestion].answer) {
    // subtract time
    timeLeft -= 5;
  } else {
    playerscore +=5;
  }
}