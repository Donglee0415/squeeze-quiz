
// Timer and score
var time = document.querySelector(".timer");
var score = document.querySelector("#score");
var secondsLeft = 110;

//Button
const start = document.querySelector("#start");

// Start questions
const codersIntro = document.querySelector("#challenge-begins");


var questionsEl = document.querySelector(".all-question");

// Question and right or wrong
let questionEl = document.querySelector("#question");
const correctWrong = document.querySelector("#right-wrong");
let questionCount = 0;


// Final score
const finalEl = document.querySelector("#final-score");
let initialsInput = document.querySelector("#initials");

// High score
const highscoresEl = document.querySelector("#high-scores");
let scoreListEl = document.querySelector(".score-list");
let scoreList = [];

// Answer button
const ansBtn = document.querySelectorAll("button.answer-btn")

// About the score
let submitScrBtn = document.querySelector("#submit-score");
let clearScrBtn = document.querySelector("#clearScores");
let viewScrBtn = document.querySelector("#view-scores");
let goBackBtn = document.querySelector("#goBack");


// Answer call
const ans1Btn = document.querySelector("#answer-1"); // 0
const ans2Btn = document.querySelector("#answer-2"); // 1
const ans3Btn = document.querySelector("#answer-3"); // 2
const ans4Btn = document.querySelector("#answer-4"); // 3



// Array of five qustions and answer.
// correctAnswer should be follow index
const questions = [ 
    {
        question: "1. Where is the JavaScript placed inside an HTML document or page?",
        answers: ["1. In the <meta> section.", "2. In the <title> section.", "3. In the <body> and <head> sections.", "4. In the <footer> section."],
        correctAnswer: "2"
    },
    {
        question: "2. In JavaScript, what element is used to store and manipulate text, usually in multiples?",
        answers: ["1. Strings", "2. Recorders", "3. Arrays", "4. Variables"],
        correctAnswer: "0"
    },
    {
        question: "3. What is the format called that is used for storing and transporting data?",
        answers: ["1. HTML", "2. Font", "3. JSON", "4. Syntax"],
        correctAnswer: "2"
    },
    {
        question: "4. What is a JavaScript element that represents either TRUE or FALSE values?",
        answers: ["1. Strings", "2. Boolean", "3. Arrays", "4. Null"],
        correctAnswer: "1"
    },
    {
        question: "5. What is the element called that can continue to execute a block of code as long as the specified condition remains TRUE?",
        answers: ["1. Repeater", "2. Debugger", "3. Loop", "4. If statement"],
        correctAnswer: "2"
    }
];


// Timer function
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        time.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            score.textContent = secondsLeft;
        }
    }, 1000);
}

// Start the quiz function
function startQuiz() {
    codersIntro.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

// set question function
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}

// Event function check answer
function checkAnswer(event) {
    event.preventDefault();

    //Creating element of right or wrong question
    correctWrong.style.display = "block";
    let p = document.createElement("p");
    correctWrong.appendChild(p);

    // Display element x amount of time
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    // Statement correct
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } 
   
     // statement wrong
    else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    // Cycle 
    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    // High score list
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    // Save score 
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    // Parsing the JSON string to an object
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// Clear score
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

 
// Start timer and display first question when click start quiz
start.addEventListener("click", startQuiz);

// Check answer
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

// Adding a score
submitScrBtn.addEventListener("click", addScore);

// Time left function
goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    codersIntro.style.display = "block";
    secondsLeft = 110;
    time.textContent = `Time:${secondsLeft}s`;
});

// Clear score
clearScrBtn.addEventListener("click", clearScores);

// High score function
viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } 
    else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } 
    
    else {
        return alert("You found me!"); // alert when student click it.
    }
});

