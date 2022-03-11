
// declaration variables
var questionEl = document.getElementById("question-title");
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var startButton = document.getElementById("start");
var currentQuestion = 0;
var timeLeft = 60; 

function startQuiz() {
    // hide start screen
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");
    // un-hide questions section
    questionsEl.removeAttribute("class");
    getQuestion();
  }
  function countdown() {
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (timeLeft > 1) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = timeLeft + ' seconds remaining';
        // Decrement `timeLeft` by 1
        timeLeft--;
      } else if (timeLeft === 1) {
        // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timerEl.textContent = '';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        // Call the `displayMessage()` function
        displayMessage();
      }
    }, 1000);
  }

// displays the question and answers
function questionDisplay(){
    questionEl.innerText = questions[currentQuestion].title;
    choicesEl.innerHTML = "";
    for (let i = 0; i < questions[currentQuestion].choices.length; i++){
        // declaring the answer button
        var answerButton = document.createElement("button");
        answerButton.setAttribute("class", "choice");
        answerButton.innerText = questions[currentQuestion].choices[i];
        choicesEl.appendChild(answerButton);
        // displays the next question upon click
        answerButton.addEventListener("click", function(event){
            event.preventDefault();
            correctAnswer(event.target.innerText);
            currentQuestion++;
            questionDisplay();
        })
    }
}
function correctAnswer(chosen){
    //check if user got wrong or correct answer
    if (chosen !== questions[currentQuestion].answer){
        // subtract time
        timeLeft -= 5;
    } else {
    }
}
startButton.onclick = startQuiz;
startButton.addEventListener("click", function(event){
    event.preventDefault();
    questionDisplay();
    countdown(); 
})

