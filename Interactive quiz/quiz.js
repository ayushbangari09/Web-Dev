// 🏆 Sports Quiz Questions (12 Questions)
const quizData = [
    {
        question: "Which country won the ICC Cricket World Cup 2011?",
        options: ["Australia", "India", "England", "Pakistan"],
        correct: 1
    },
    {
        question: "How many players are there in a football team on the field?",
        options: ["9", "10", "11", "12"],
        correct: 2
    },
    {
        question: "Who is known as the 'Fastest Man in the World'?",
        options: ["Cristiano Ronaldo", "Usain Bolt", "Lionel Messi", "Virat Kohli"],
        correct: 1
    },
    {
        question: "In which sport is the term 'Love' used?",
        options: ["Basketball", "Tennis", "Cricket", "Hockey"],
        correct: 1
    },
    {
        question: "Which country hosts the Wimbledon tournament?",
        options: ["USA", "France", "Australia", "United Kingdom"],
        correct: 3
    },
    {
        question: "Which sport uses a shuttlecock?",
        options: ["Tennis", "Badminton", "Table Tennis", "Squash"],
        correct: 1
    },
    {
        question: "How many rings are there in the Olympic symbol?",
        options: ["4", "5", "6", "7"],
        correct: 1
    },
    {
        question: "Which country has won the most FIFA World Cups?",
        options: ["Germany", "Argentina", "Brazil", "Italy"],
        correct: 2
    },
    {
        question: "In cricket, how many balls are there in one over?",
        options: ["5", "6", "7", "8"],
        correct: 1
    },
    {
        question: "Which sport is associated with the NBA?",
        options: ["Baseball", "Basketball", "Football", "Hockey"],
        correct: 1
    },
    {
        question: "Who has won the most Grand Slam titles in men's tennis (as of recent years)?",
        options: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Andy Murray"],
        correct: 2
    },
    {
        question: "Which country won the FIFA World Cup 2022?",
        options: ["France", "Brazil", "Argentina", "Germany"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const startContainer = document.getElementById("start-container");
const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const finalScore = document.getElementById("final-score");
const feedback = document.getElementById("feedback");
const restartBtn = document.getElementById("restart-btn");

// START QUIZ
startBtn.addEventListener("click", () => {
    startContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    loadQuestion();
});

// LOAD QUESTION
function loadQuestion() {
    const current = quizData[currentQuestion];
    questionEl.textContent = `Q${currentQuestion + 1}. ${current.question}`;
    optionsEl.innerHTML = "";
    selectedAnswer = null;
    nextBtn.disabled = true;

    current.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;

        button.addEventListener("click", () => {
            document.querySelectorAll("#options button")
                .forEach(btn => btn.classList.remove("selected"));

            button.classList.add("selected");
            selectedAnswer = index;
            nextBtn.disabled = false;
        });

        optionsEl.appendChild(button);
    });
}

// NEXT BUTTON
nextBtn.addEventListener("click", () => {

    if (selectedAnswer === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// SHOW RESULT
function showResult() {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    finalScore.textContent = `Your Score: ${score} / ${quizData.length}`;

    if (score === quizData.length) {
        feedback.textContent = "🔥 Excellent! Perfect Score!";
    } else if (score >= 8) {
        feedback.textContent = "🏆 Great Performance!";
    } else if (score >= 5) {
        feedback.textContent = "👍 Good Try!";
    } else {
        feedback.textContent = "❌ Keep Practicing!";
    }
}

// RESTART QUIZ
restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    loadQuestion();
});
