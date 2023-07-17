// Timed quiz, javascript fundamentals, store high scores
// start button, timer, questions/answers, score, initials

// initializations
// global state
let timer = 0; 

// start page
let startPageElement = document.getElementById('start-page'); // container for start button and start text (h1 and p)
let startButtonElement = document.getElementById('start-button'); // button
// timer
let timerElement = document.getElementById('timer'); // p
// questions
let questionElement = document.getElementById('question'); // h1
let choicesElement = document.getElementById('choices'); // ol
let feedbackElement = document.getElementById('feedback'); // p, hr above
// high scores
// TODO: high scores page, different html page, link to it from start page, link back to start page from high scores page

// start quiz on start button click
startButtonElement.addEventListener('click', function() {
    // hide start button and start text
    startPageElement.setAttribute('class', 'hidden');
    // TODO: start timer
    startTimer();
    // display first question
    displayQuestion();
}); 

function startTimer() { 
}


    setInterval( function() {
        timerElement.textContent = `Time: ${timeLeft}`;
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            // TODO: end quiz
        }
    }, 1000);


// end quiz when all questions are answered (question array is empty) or timer reaches 0