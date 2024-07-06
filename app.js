const quizOptions = [
    {
        question: "What is the capital of Japan?",
        options: ["Tokyo", "Osaka", "Islamabad", "Seoul"],
        answer: "Tokyo"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    
    {
        question: "Which country won the FIFA World Cup in 2022?",
        options: ["Brazil", "Germany", "France", "Argentina"],
        answer: "Argentina"
    },
    {
        question: "Who wrote the poem 'Daffodials'?",
        options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "George Orwell"],
        answer: "William Shakespeare"
    },

    {
        question: "Which ocean is the largest?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    }
    
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("next-btn");
const quizForm = document.getElementById("quiz-form");

// Function to shuffle quizOptions array
function shuffleQuizData() {
    for (let i = quizOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quizOptions[i], quizOptions[j]] = [quizOptions[j], quizOptions[i]];
    }
}

// Function to initialize quiz
function initializeQuiz() {
    shuffleQuizData();
    currentQuestion = 0;
    score = 0;
    nextButton.style.display = "none";
    loadQuestion();
}

// Function to load question and options
function loadQuestion() {
    const currentQuizData = quizOptions[currentQuestion];
    questionElement.textContent = currentQuizData.question;
    optionsElement.innerHTML = "";

    currentQuizData.options.forEach((option, index) => {
        const optionLabel = document.createElement("label");
        optionLabel.textContent = option;

        const radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.name = "quiz-option";
        radioButton.value = option;
        radioButton.dataset.answer = currentQuizData.answer;
        radioButton.addEventListener("change", () => checkAnswer(radioButton));

        optionLabel.appendChild(radioButton);
        optionsElement.appendChild(optionLabel);
    });
}

// Function to check answer
function checkAnswer(selectedOption) {
    const correctAnswer = selectedOption.dataset.answer;

    if (selectedOption.value === correctAnswer) {
        score++;
        resultElement.textContent = "Correct!";
    } else {
        resultElement.textContent = "Wrong!";
    }

    disableOptions();
    nextButton.style.display = "block";
}

function disableOptions() {
    const radioButtons = document.getElementsByName("quiz-option");
    radioButtons.forEach(radioButton => {
        radioButton.disabled = true;
    });
}


function nextQuestion() {
    resultElement.textContent = "";
    nextButton.style.display = "none";
    currentQuestion++;

    if (currentQuestion < quizOptions.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}


function showFinalScore() {
    const finalScore = `Quiz completed! Your score is ${score} out of ${quizOptions.length}.`;
    alert(finalScore);
    optionsElement.innerHTML = "";
    initializeQuiz(); 
}
nextButton.addEventListener("click", nextQuestion);


initializeQuiz();
