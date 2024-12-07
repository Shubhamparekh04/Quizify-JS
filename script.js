'use strict';

const quizQuestions = [
    {
        question: "What is the correct syntax to print a message to the console?",
        options: ["console.log('Hello')", "print('Hello')", "echo('Hello')", "System.out.println('Hello')"],
        answer: "console.log('Hello')" // Answer key
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Number", "Boolean", "Float"],
        answer: "Float" // Answer key
    },
    {
        question: "How do you declare a JavaScript variable?",
        options: ["let varName;", "variable varName;", "declare varName;", "var varName;"],
        answer: "let varName;" // Answer key
    },
    {
        question: "What is the output of `typeof NaN` in JavaScript?",
        options: ["number", "NaN", "undefined", "string"],
        answer: "number" // Answer key
    },
    {
        question: "Which method is used to add an element at the end of an array?",
        options: [".push()", ".pop()", ".shift()", ".unshift()"],
        answer: ".push()" // Answer key
    },
    {
        question: "What will `2 + '2'` evaluate to in JavaScript?",
        options: ["4", "'22'", "undefined", "NaN"],
        answer: "'22'" // Answer key
    },
    {
        question: "Which of the following is the correct way to create an object?",
        options: [
            "let obj = { key: 'value' };",
            "let obj = (key = 'value');",
            "let obj = [key: 'value'];",
            "let obj = key: 'value';"
        ],
        answer: "let obj = { key: 'value' };" // Answer key
    },
    {
        question: "What will `setTimeout` return in JavaScript?",
        options: ["The delay time", "An ID that can be used to clear the timeout", "Undefined", "A Promise"],
        answer: "An ID that can be used to clear the timeout" // Answer key
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["/*", "//", "#", "<!--"],
        answer: "//" // Answer key
    },
    {
        question: "How can you convert a string to an integer in JavaScript?",
        options: ["parseInt()", "toInteger()", "Number()", "All of the above"],
        answer: "parseInt()" // Answer key
    }
];

let understoodBtn = document.getElementById('understoodBtn');
let modal = document.getElementById('rulesModal');
let container = document.querySelector('.container');
let que = document.querySelector('.question');

understoodBtn.addEventListener('click', () => {
    startCounter();
    modal.style.display = 'none';
})

let hr = 0, min = 0, sec = 0, totSec = quizQuestions.length * 15, correctAns = 0, index = 0;

hr = Math.floor(totSec / 3600);
min = Math.floor((totSec % 3600) / 60);
sec = totSec % 60;

let h = document.querySelector('.h');
let m = document.querySelector('.m');
let s = document.querySelector('.s');



//Selecting all label elements
let labelOpts = document.querySelectorAll('.form-check-label');
//Selecting all radio btn elements
let radioOpt = document.querySelectorAll('.form-check-input');

//default question
que.innerHTML = quizQuestions[0].question;

//default options & value to radio button
for (let i = 0; i < 4; i++) {
    labelOpts[i].innerHTML = `${quizQuestions[0].options[i]}`;
    radioOpt[i].value = `${quizQuestions[0].options[i]}`;
}

let prev = document.querySelector('.prev');
let next = document.querySelector('.next');

let tracker = document.querySelector('.tracker');

let track = () => {
    tracker.innerHTML = `Question ${index + 1 <= 9 ? "0" + (index + 1) : index + 1} of ${quizQuestions.length} [JavaScript]`;
}

track();

//HourMinuteSecond Format
function hMsFormat() {
    h.innerHTML = hr <= 9 ? `0${hr}` : `${hr}`;
    m.innerHTML = min <= 9 ? `: 0${min}` : `: ${min}`;
    s.innerHTML = sec <= 9 ? `: 0${sec}` : `: ${sec}`;
}

hMsFormat();

function startCounter() {
    let countdown = setInterval(() => {
        if (hr == 0 && min == 0 && sec == 0) {
            clearInterval(countdown);
            // Update the display
            hMsFormat();
            endQuiz();
            return;
        }

        if (sec == 0) {
            sec = 59;
            if (min == 0) {
                min = 59;
                hr--;

            } else {
                min--;
            }

        } else {
            sec--;
        }

        hMsFormat();
    }, 1000)
}



//Checks which option is selected.
for (let i = 0; i < radioOpt.length; i++) {
    radioOpt[i].addEventListener('click', () => {

        if (radioOpt[i].value == quizQuestions[index].answer) {
            correctAns++;
        }
    });
}



next.addEventListener('click', () => {
    index++;

    if (index < quizQuestions.length) {

        radioOpt.forEach(radio => radio.checked = false);

        que.innerHTML = quizQuestions[index].question;
        for (let j = 0; j < 4; j++) {
            labelOpts[j].textContent = quizQuestions[index].options[j];
            radioOpt[j].value = quizQuestions[index].options[j];
        }
    }
    next.disabled = index >= quizQuestions.length - 1;
    prev.disabled = index <= 0;
    track();
})

prev.addEventListener('click', () => {
    index--;

    if (index >= 0) {
        radioOpt.forEach(radio => radio.checked = false);

        que.innerHTML = quizQuestions[index].question;
        for (let j = 0; j < 4; j++) {
            labelOpts[j].textContent = quizQuestions[index].options[j];
            radioOpt[j].value = quizQuestions[index].options[j];
        }
    }

    next.disabled = index >= quizQuestions.length - 1;
    prev.disabled = index <= 0;
    track();
})


// Function to end the quiz and show the result
function endQuiz() {
    container.innerHTML = `
        <div class="text-center">
            <h3>Quiz Over</h3>
            <p>Your Score: <strong>${correctAns} / ${quizQuestions.length}</strong></p>
            <button class="btn btn-primary" onclick="location.reload()">Restart</button>
        </div>
    `;
    container.style.border = 'none'; // Remove border styling
}


// Add event listener to the Submit button
document.querySelector('.btn-success').addEventListener('click', (e) => {
    e.preventDefault();
    endQuiz();
});

