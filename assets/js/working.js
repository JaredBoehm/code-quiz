// initialization


function displayQuestion() { // will display the question string and answer choices of the first question object in the questions array
    // get the first question object from the array
    let currentQuestion = questions[0];

    // display the question string
    questionElement.textContent = currentQuestion.question;

    // display the answer choices
    currentQuestion.answer.choices.forEach(function(choice) {
        let e = document.createElement('li');
        e.textContent = choice;
        choicesElement.appendChild(e);
    }); 
}

// check if the answer is correct when user clicks on a choice, and display feedback, then display the next question
choicesElement.addEventListener('click', function(event) {
    let e = event.target;
    if (e.textContent === currentQuestion.answer.correct) {
        displayFeedback('Correct!');
    } else {
        displayFeedback('Wrong!');
        // TODO: subtract 10 seconds from timer
    }
    displayNextQuestion();
});

// display feedback string provided, in this case "correct" or "wrong"
function displayFeedback(feedback) {
    // show feedback element
    feedbackElement.removeAttribute('class', 'hidden');
    feedbackElement.textContent = feedback;
    // hide feedback after 1 second, TOFIX: possible issue if user clicks on another answer before the timeout
    setTimeout(function() {
        feedbackElement.setAttribute('class', 'hidden');
    }, 1000);
}

// remove the first (previously answered) question from the array, and display the next question
function displayNextQuestion() {
    // remove 
    questions.shift();
    // display
    displayQuestion();
}
    