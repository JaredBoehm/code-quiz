// questions array, contains object of each question, with the question (string) and answer (object) with answer choices (array of strings) and the correct answer (string)
let questions = [
    { 
        question: 'Commonly used data types DO NOT include:', 
        answer: {
            choices: ['strings', 'booleans', 'alerts', 'numbers'],
            correct: 'alerts',
        },
    },
    {
        question: 'The condition in an if / else statement is enclosed within ____.',
        answer: {
            choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
            correct: 'parentheses',
        },
    },
    {
        question: 'Arrays in JavaScript can be used to store ____.',
        answer: {
            choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
            correct: 'all of the above',
        },
    },
    {
        question: 'String values must be enclosed within ____ when being assigned to variables.',
        answer: {
            choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
            correct: 'quotes',
        },  
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answer: {
            choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
            correct: 'console.log',
        },
    },
];