// questions array, contains object of each question, with the question (string) and answer (object) with answer choices (array of strings) and the correct answer (string)
const questionsRootArray = [
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

function newQuestionsArray() {
    let questionsArray = JSON.parse(JSON.stringify(questionsRootArray)); // my current understanding:
                                                                         // don't modify the original questions array, (newArray = questionsRootArray) will assign newArray to a value of the memory reference for questionsRootArray
                                                                         // so newArray[0] would === a reference to the same location in memory as questionsRootArray[0], so newArray[0] = 5 means questionsRootArray[0] is now === 5
                                                                         // (call by sharing, pass by copy of reference, call by value, or whatever), more here: https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy
    return questionsArray;
}