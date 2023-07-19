// initializations ----------------------------------------------------

// global state, not thrilled about it
let timer = 0; 
let score = 0;
let currentQuestion = {};
let highScores = [];
let questionsArray = newQuestionsArray();

// start page
let startPageElement = document.getElementById('start-page'); // container for start button and start text (h1 and p respectively)
let startButtonElement = document.getElementById('start-button'); // button

// timer
let timerElement = document.getElementById('timer'); // p, in header

// questions
let questionPageElement = document.getElementById('question-page'); // container for question and answer choices
let questionElement = document.getElementById('question'); // h1
let choicesElement = document.getElementById('choices'); // ol
let feedbackElement = document.getElementById('feedback'); // p

// submit scores
let submitScorePageElement = document.getElementById('submit-score-page'); // container for submit score form
let finalScoreElement = document.getElementById('final-score'); // p
let submitButtonElement = document.getElementById('submit-button'); // form
let initialsInputElement = document.getElementById('initials-input'); // input

// high scores
let highScoresLinkElement = document.getElementById('high-scores-link'); // a, in header
let highScoresPageElement = document.getElementById('high-scores-page'); // container for high scores list
let highScoresListElement = document.getElementById('high-scores'); // ol
let goBackButtonElement = document.getElementById('go-back-button'); // button
let clearHighScoresButtonElement = document.getElementById('clear-scores-button'); // button

// function definitions ----------------------------------------------------

function loadHighScores() {
    // get high scores from local storage
    highScores = JSON.parse(localStorage.getItem('highScores'));
    if (highScores === null) {
        highScores = [];
        localStorage.setItem('highScores', JSON.stringify(highScores));
    };
}
loadHighScores(); // check for highScores in localStorage on first load

function hideAllPages() {
    startPageElement.setAttribute('class', 'hidden');
    questionPageElement.setAttribute('class', 'hidden');
    submitScorePageElement.setAttribute('class', 'hidden');
    highScoresPageElement.setAttribute('class', 'hidden');
};

function displayHighScores() {
    // get high scores from local storage
    loadHighScores();
    // hide all pages
    hideAllPages();
    // display high scores page
    highScoresPageElement.removeAttribute('class', 'hidden');
    // clear previous high scores
    highScoresListElement.innerHTML = '';
    // sort high scores, pass a compare function into the sort method, more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    highScores = highScores.sort(function(a, b) {
        return b.score - a.score; 
        // my current understanding of the sort method:
        // given a negative result, a is sorted before b (assumption: 50(a) - 100(b) = -50, so 50(a) is smaller than 100(b), default ascending sort e.g. [a,b] or [50,100]), 
        // given a positive result, b is sorted before a (assumption: 100(a) - 50(b) = 50, so 100(a) is greater than 50(b), reverse sort operation but same end result, so [b,a] or [50,100]),
        // a zero result does nothing, (50 - 50 = 0), no sorting is done, values stay in the same place
        // in this case reversing from (a - b) to (b - a) will sort in the opposite (descending) order, assuming a = 50, b = 100; (100(b) - 50(a) = 50) instead of (50(a) - 100(b) = -50), so [b,a] or [100,50]
    });
    // display high scores
    highScores.forEach(function(highScore) {
        let e = document.createElement('li');
        e.textContent = `${highScore.initials} - ${highScore.score}`;
        highScoresListElement.appendChild(e);
    });
};

function startTimer() { 
    timerElement.textContent = `Time: ${timer}`;
    if (timer > 0) { // there is still time left on the timer
        timer--;
        setTimeout(startTimer, 1000); // function will call itself again every second
    } else if (questionsArray.length !== 0) { // if timer reaches 0 before all questions are answered, end quiz; the if() checks if the user has already finished the quiz, if so don't invoke endQuiz() again 
        endQuiz();
    };
};

// display the question string and answer choices of the first question object in the questions array
function displayQuestion() { 
    // if the question page is hidden, unhide it
    if (questionPageElement.hasAttribute('class', 'hidden')) { 
        questionPageElement.removeAttribute('class', 'hidden');
    };
    // get the first question object from the array
    currentQuestion = questionsArray[0];
    // display the question string
    questionElement.textContent = currentQuestion.question;
    // clear the previous answer choices
    choicesElement.innerHTML = '';
    // display the answer choices
    currentQuestion.answer.choices.forEach(function(choice) {
        let e = document.createElement('li');
        e.setAttribute('class', 'hover-pointer');
        e.setAttribute('tabindex', '0'); /* tab accessibility */
        e.textContent = choice;
        choicesElement.appendChild(e);
    }); 
};

// display feedback string provided, in this case "correct" or "wrong"
function displayFeedback(feedback) {
    // show feedback element
    feedbackElement.removeAttribute('class', 'hidden-occupy-space');
    // display feedback string
    feedbackElement.innerHTML = feedback;
    // hide feedback after 1 second
    setTimeout(function() {
        feedbackElement.setAttribute('class', 'hidden-occupy-space');
    }, 1000);
};

// remove the first (previously answered) question object from the array, and display the next question
function displayNextQuestion() {
    // remove 
    questionsArray.shift();
    if (questionsArray.length === 0) {
        endQuiz();
        return; // stop the function here if there are no more questions
    };
    // display
    displayQuestion();
};

// end quiz when all questions are answered (question array is empty) or timer reaches 0
function endQuiz() {
    score = timer;
    // stop timer
    timer = 0;
    timerElement.textContent = `Time: ${timer}`;
    // hide question page
    questionPageElement.setAttribute('class', 'hidden');
    // display submit-score-page
    submitScorePageElement.removeAttribute('class', 'hidden');
    // display final score
    finalScoreElement.textContent = `Your final score is ${score}.`;
};

// event listeners ----------------------------------------------------

// HIGH SCORES
// show high scores page when user clicks on high scores link
highScoresLinkElement.addEventListener('click', function() {
    // stop quiz if it's running
    questionsArray = [];
    timer = 0;
    timerElement.textContent = `Time: ${timer}`;
    // display high scores page
    displayHighScores();
});

// START BUTTON
// start quiz on start button click
startButtonElement.addEventListener('click', function() {
    // hide start button and start text
    startPageElement.setAttribute('class', 'hidden');
    // start timer
    timer = 75;
    startTimer();
    // display first question
    questionsArray = newQuestionsArray(); // create a new questions array for the quiz
    displayQuestion();
}); 

// QUESTION PAGE, CHOICES
// check if the answer is correct when user clicks on a choice and display feedback, then display the next question
choicesElement.addEventListener('click', function(event) {
    let e = event.target;
    if (e.textContent === currentQuestion.answer.correct) {
        displayFeedback('Correct!');
    } else {
        displayFeedback('Wrong!');
        timer -= 10;
        timerElement.textContent = `Time: ${timer}`;
    }
    displayNextQuestion();
});

// SUBMIT SCORE PAGE, SUBMIT BUTTON
// save high score to local storage when user clicks on submit button
submitButtonElement.addEventListener('click', function() {
    let initials = initialsInputElement.value;
    if (initials === '') {
        initials = 'Anon';
    };
    let highScore = {initials: initials, score: score};
    highScores.push(highScore);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    displayHighScores();
});

// HIGH SCORES PAGE, GO BACK BUTTON
// go back to start page when user clicks on go back button
goBackButtonElement.addEventListener('click', function() {
    hideAllPages();
    startPageElement.removeAttribute('class', 'hidden');
});

// HIGH SCORES PAGE, CLEAR HIGH SCORES BUTTON
// clear high scores from local storage when user clicks on clear high scores button
clearHighScoresButtonElement.addEventListener('click', function() {
    highScores = [];
    localStorage.setItem('highScores', JSON.stringify(highScores));
    displayHighScores();
});