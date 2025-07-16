// DOM Elements
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const questionContainer = document.getElementById('questionContainer');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('optionsContainer');
const questionCounter = document.getElementById('questionCounter');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const resultContainer = document.getElementById('resultContainer');
const resultTitle = document.getElementById('resultTitle');
const resultScore = document.getElementById('resultScore');
const resultMessage = document.getElementById('resultMessage');
const resultDetails = document.getElementById('resultDetails');

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 0;
let timer = null;
let selectedAnswer = null;
let quizCompleted = false;

// Sample quiz questions (in a real app, these would come from an API)
const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Au", "Fe", "Cu"],
        correct: 1
    },
    {
        question: "Which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correct: 2
    },
    {
        question: "What is the main component of the sun?",
        options: ["Liquid lava", "Molten iron", "Hydrogen gas", "Solid rock"],
        correct: 2
    },
    {
        question: "How many sides does a hexagon have?",
        options: ["5", "6", "7", "8"],
        correct: 1
    },
    {
        question: "Which country is home to the kangaroo?",
        options: ["New Zealand", "South Africa", "Australia", "India"],
        correct: 2
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correct: 1
    }
];

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);

// Start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizCompleted = false;
    selectedAnswer = null;
    
    // Hide start button and show quiz
    startBtn.style.display = 'none';
    questionContainer.style.display = 'block';
    
    // Shuffle questions
    shuffleArray(quizQuestions);
    
    // Show first question
    showQuestion();
    
    // Start timer
    startTimer();
}

// Show current question
function showQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    
    // Update question counter
    questionCounter.textContent = `${currentQuestionIndex + 1} / ${quizQuestions.length}`;
    
    // Update score
    scoreElement.textContent = score;
    
    // Set question text
    questionElement.textContent = question.question;
    
    // Create options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        
        optionElement.addEventListener('click', () => selectOption(index));
        
        optionsContainer.appendChild(optionElement);
    });
    
    // Reset selected answer
    selectedAnswer = null;
    
    // Disable next button until answer is selected
    nextBtn.disabled = true;
    nextBtn.textContent = 'Select an answer';
}

// Select an option
function selectOption(index) {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    selectedAnswer = index;
    
    // Remove previous selections
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Mark selected option
    const selectedOption = document.querySelector(`[data-index="${index}"]`);
    selectedOption.classList.add('selected');
    
    // Enable next button
    nextBtn.disabled = false;
    nextBtn.textContent = 'Next Question';
}

// Next question
function nextQuestion() {
    if (selectedAnswer === null) return;
    
    // Check if answer is correct
    const question = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correct;
    
    if (isCorrect) {
        score++;
    }
    
    // Show correct/incorrect feedback
    showAnswerFeedback(isCorrect);
    
    // Wait 1.5 seconds before moving to next question
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }, 1500);
}

// Show answer feedback
function showAnswerFeedback(isCorrect) {
    const question = quizQuestions[currentQuestionIndex];
    
    // Disable all options
    document.querySelectorAll('.option').forEach(option => {
        option.classList.add('disabled');
        option.style.pointerEvents = 'none';
    });
    
    // Mark correct and incorrect answers
    document.querySelectorAll('.option').forEach((option, index) => {
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedAnswer && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    // Update score immediately
    scoreElement.textContent = score;
}

// End quiz
function endQuiz() {
    clearInterval(timer);
    quizCompleted = true;
    
    // Hide quiz container
    questionContainer.style.display = 'none';
    
    // Show results
    showResults();
}

// Show results
function showResults() {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const timeUsed = 60 - timeLeft;
    
    // Set result title and message
    if (percentage >= 80) {
        resultTitle.textContent = 'Excellent! 🎉';
        resultMessage.textContent = 'You have excellent knowledge!';
    } else if (percentage >= 60) {
        resultTitle.textContent = 'Good Job! 👍';
        resultMessage.textContent = 'You have good knowledge!';
    } else if (percentage >= 40) {
        resultTitle.textContent = 'Not Bad! 😊';
        resultMessage.textContent = 'You have average knowledge.';
    } else {
        resultTitle.textContent = 'Keep Learning! 📚';
        resultMessage.textContent = 'You need to study more.';
    }
    
    // Set score
    resultScore.textContent = `${score}/${quizQuestions.length}`;
    
    // Create result details
    resultDetails.innerHTML = `
        <div class="result-item">
            <div class="result-label">Score</div>
            <div class="result-value">${percentage}%</div>
        </div>
        <div class="result-item">
            <div class="result-label">Time Used</div>
            <div class="result-value">${timeUsed}s</div>
        </div>
        <div class="result-item">
            <div class="result-label">Correct Answers</div>
            <div class="result-value">${score}</div>
        </div>
        <div class="result-item">
            <div class="result-label">Wrong Answers</div>
            <div class="result-value">${quizQuestions.length - score}</div>
        </div>
    `;
    
    // Show result container
    resultContainer.style.display = 'block';
    
    // Change next button to restart
    nextBtn.textContent = 'Restart Quiz';
    nextBtn.onclick = restartQuiz;
    nextBtn.disabled = false;
}

// Restart quiz
function restartQuiz() {
    // Reset state
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    selectedAnswer = null;
    quizCompleted = false;
    
    // Hide results
    resultContainer.style.display = 'none';
    
    // Show start button
    startBtn.style.display = 'block';
    
    // Reset next button
    nextBtn.textContent = 'Next Question';
    nextBtn.onclick = nextQuestion;
    nextBtn.disabled = true;
    
    // Reset timer display
    timerElement.textContent = '60s';
}

// Start timer
function startTimer() {
    timeLeft = 60;
    timerElement.textContent = `${timeLeft}s`;
    
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!quizCompleted) {
                endQuiz();
            }
        }
    }, 1000);
}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Initialize quiz
function init() {
    // Hide quiz and result containers initially
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'none';
    
    // Show start button
    startBtn.style.display = 'block';
    
    // Disable next button initially
    nextBtn.disabled = true;
}

// Start the app
init(); 