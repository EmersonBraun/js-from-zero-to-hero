document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const startScreen = document.getElementById('startScreen');
    const questionScreen = document.getElementById('questionScreen');
    const resultScreen = document.getElementById('resultScreen');
    const startBtn = document.getElementById('startBtn');
    const nextBtn = document.getElementById('nextBtn');
    const restartBtn = document.getElementById('restartBtn');
    const reviewBtn = document.getElementById('reviewBtn');
    const questionText = document.getElementById('questionText');
    const answersContainer = document.getElementById('answers');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const scoreElement = document.getElementById('score');
    const finalScore = document.getElementById('finalScore');
    const totalQuestions = document.getElementById('totalQuestions');
    const percentage = document.getElementById('percentage');
    const resultMessage = document.getElementById('resultMessage');

    // Quiz state
    let currentQuestion = 0;
    let score = 0;
    let questions = [];
    let userAnswers = [];
    let selectedAnswer = null;

    // Sample questions database
    const questionDatabase = {
        general: {
            easy: [
                {
                    question: "What is the capital of France?",
                    answers: ["London", "Berlin", "Paris", "Madrid"],
                    correct: 2
                },
                {
                    question: "Which planet is closest to the Sun?",
                    answers: ["Venus", "Mars", "Mercury", "Earth"],
                    correct: 2
                },
                {
                    question: "What is the largest ocean on Earth?",
                    answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
                    correct: 3
                },
                {
                    question: "How many continents are there?",
                    answers: ["5", "6", "7", "8"],
                    correct: 2
                },
                {
                    question: "What is the main component of the Sun?",
                    answers: ["Liquid lava", "Molten iron", "Hydrogen gas", "Solid rock"],
                    correct: 2
                }
            ],
            medium: [
                {
                    question: "Who wrote 'Romeo and Juliet'?",
                    answers: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
                    correct: 1
                },
                {
                    question: "What year did World War II end?",
                    answers: ["1943", "1944", "1945", "1946"],
                    correct: 2
                },
                {
                    question: "What is the chemical symbol for gold?",
                    answers: ["Ag", "Au", "Fe", "Cu"],
                    correct: 1
                },
                {
                    question: "Which country is home to the kangaroo?",
                    answers: ["New Zealand", "South Africa", "Australia", "India"],
                    correct: 2
                },
                {
                    question: "What is the largest mammal?",
                    answers: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
                    correct: 1
                }
            ],
            hard: [
                {
                    question: "What is the speed of light in meters per second?",
                    answers: ["299,792,458", "199,792,458", "399,792,458", "499,792,458"],
                    correct: 0
                },
                {
                    question: "Who was the first person to walk on the moon?",
                    answers: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "Alan Shepard"],
                    correct: 1
                },
                {
                    question: "What is the atomic number of carbon?",
                    answers: ["4", "6", "8", "12"],
                    correct: 1
                },
                {
                    question: "In which year did the Berlin Wall fall?",
                    answers: ["1987", "1989", "1991", "1993"],
                    correct: 1
                },
                {
                    question: "What is the largest desert in the world?",
                    answers: ["Sahara", "Arabian", "Antarctic", "Gobi"],
                    correct: 2
                }
            ]
        },
        science: {
            easy: [
                {
                    question: "What is the hardest natural substance on Earth?",
                    answers: ["Steel", "Diamond", "Granite", "Iron"],
                    correct: 1
                },
                {
                    question: "What is the chemical formula for water?",
                    answers: ["H2O", "CO2", "O2", "N2"],
                    correct: 0
                },
                {
                    question: "What force pulls objects toward Earth?",
                    answers: ["Magnetism", "Gravity", "Friction", "Electricity"],
                    correct: 1
                },
                {
                    question: "What is the largest organ in the human body?",
                    answers: ["Heart", "Brain", "Liver", "Skin"],
                    correct: 3
                },
                {
                    question: "What gas do plants absorb from the air?",
                    answers: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
                    correct: 1
                }
            ],
            medium: [
                {
                    question: "What is the study of fossils called?",
                    answers: ["Archaeology", "Paleontology", "Geology", "Biology"],
                    correct: 1
                },
                {
                    question: "What is the atomic structure of DNA?",
                    answers: ["Single helix", "Double helix", "Triple helix", "Quadruple helix"],
                    correct: 1
                },
                {
                    question: "What is the largest planet in our solar system?",
                    answers: ["Saturn", "Neptune", "Jupiter", "Uranus"],
                    correct: 2
                },
                {
                    question: "What is the process by which plants make food?",
                    answers: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
                    correct: 1
                },
                {
                    question: "What is the unit of electrical resistance?",
                    answers: ["Volt", "Ampere", "Ohm", "Watt"],
                    correct: 2
                }
            ],
            hard: [
                {
                    question: "What is the Heisenberg Uncertainty Principle about?",
                    answers: ["Position and momentum", "Energy and time", "Wave and particle", "All of the above"],
                    correct: 3
                },
                {
                    question: "What is the speed of sound in air at room temperature?",
                    answers: ["343 m/s", "300 m/s", "400 m/s", "500 m/s"],
                    correct: 0
                },
                {
                    question: "What is the largest known star in the universe?",
                    answers: ["Betelgeuse", "UY Scuti", "VY Canis Majoris", "Antares"],
                    correct: 1
                },
                {
                    question: "What is the quantum number that describes electron spin?",
                    answers: ["Principal", "Azimuthal", "Magnetic", "Spin"],
                    correct: 3
                },
                {
                    question: "What is the theory of relativity proposed by?",
                    answers: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Max Planck"],
                    correct: 1
                }
            ]
        },
        history: {
            easy: [
                {
                    question: "Who was the first President of the United States?",
                    answers: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
                    correct: 2
                },
                {
                    question: "In what year did Columbus discover America?",
                    answers: ["1490", "1492", "1495", "1500"],
                    correct: 1
                },
                {
                    question: "What ancient wonder was located in Alexandria?",
                    answers: ["Colossus", "Lighthouse", "Temple", "Pyramid"],
                    correct: 1
                },
                {
                    question: "Who was the first Emperor of Rome?",
                    answers: ["Julius Caesar", "Augustus", "Nero", "Caligula"],
                    correct: 1
                },
                {
                    question: "What year did World War I begin?",
                    answers: ["1914", "1915", "1916", "1917"],
                    correct: 0
                }
            ],
            medium: [
                {
                    question: "Who was the first female Prime Minister of the UK?",
                    answers: ["Margaret Thatcher", "Theresa May", "Indira Gandhi", "Golda Meir"],
                    correct: 0
                },
                {
                    question: "What year did the French Revolution begin?",
                    answers: ["1789", "1790", "1791", "1792"],
                    correct: 0
                },
                {
                    question: "Who was the first Emperor of China?",
                    answers: ["Confucius", "Qin Shi Huang", "Han Wudi", "Tang Taizong"],
                    correct: 1
                },
                {
                    question: "What year did the Berlin Wall fall?",
                    answers: ["1987", "1989", "1991", "1993"],
                    correct: 1
                },
                {
                    question: "Who was the first person to reach the South Pole?",
                    answers: ["Robert Scott", "Roald Amundsen", "Ernest Shackleton", "Richard Byrd"],
                    correct: 1
                }
            ],
            hard: [
                {
                    question: "What year did the Roman Empire officially end?",
                    answers: ["376 CE", "410 CE", "476 CE", "565 CE"],
                    correct: 2
                },
                {
                    question: "Who was the first female to win a Nobel Prize?",
                    answers: ["Marie Curie", "Mother Teresa", "Jane Addams", "Pearl Buck"],
                    correct: 0
                },
                {
                    question: "What year did the Black Death reach Europe?",
                    answers: ["1346", "1347", "1348", "1349"],
                    correct: 1
                },
                {
                    question: "Who was the longest-reigning monarch in history?",
                    answers: ["Queen Victoria", "King Louis XIV", "Emperor Hirohito", "Queen Elizabeth II"],
                    correct: 1
                },
                {
                    question: "What year did the first moon landing occur?",
                    answers: ["1967", "1968", "1969", "1970"],
                    correct: 2
                }
            ]
        },
        geography: {
            easy: [
                {
                    question: "What is the largest country in the world?",
                    answers: ["China", "Canada", "Russia", "United States"],
                    correct: 2
                },
                {
                    question: "What is the capital of Japan?",
                    answers: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
                    correct: 2
                },
                {
                    question: "Which continent is the largest?",
                    answers: ["North America", "Europe", "Asia", "Africa"],
                    correct: 2
                },
                {
                    question: "What is the longest river in the world?",
                    answers: ["Amazon", "Nile", "Yangtze", "Mississippi"],
                    correct: 1
                },
                {
                    question: "What is the smallest country in the world?",
                    answers: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
                    correct: 2
                }
            ],
            medium: [
                {
                    question: "What is the highest mountain in the world?",
                    answers: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
                    correct: 1
                },
                {
                    question: "What is the largest desert in Africa?",
                    answers: ["Kalahari", "Sahara", "Namib", "Libyan"],
                    correct: 1
                },
                {
                    question: "What is the capital of Australia?",
                    answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
                    correct: 2
                },
                {
                    question: "What is the largest lake in the world?",
                    answers: ["Caspian Sea", "Lake Superior", "Lake Victoria", "Lake Baikal"],
                    correct: 0
                },
                {
                    question: "What is the deepest ocean trench?",
                    answers: ["Puerto Rico Trench", "Mariana Trench", "Java Trench", "Philippine Trench"],
                    correct: 1
                }
            ],
            hard: [
                {
                    question: "What is the largest coral reef system in the world?",
                    answers: ["Great Barrier Reef", "Belize Barrier Reef", "New Caledonia Barrier Reef", "Red Sea Coral Reef"],
                    correct: 0
                },
                {
                    question: "What is the driest place on Earth?",
                    answers: ["Sahara Desert", "Atacama Desert", "Antarctic Desert", "Gobi Desert"],
                    correct: 1
                },
                {
                    question: "What is the largest island in the world?",
                    answers: ["Greenland", "New Guinea", "Borneo", "Madagascar"],
                    correct: 0
                },
                {
                    question: "What is the highest waterfall in the world?",
                    answers: ["Angel Falls", "Niagara Falls", "Victoria Falls", "Iguazu Falls"],
                    correct: 0
                },
                {
                    question: "What is the largest active volcano in the world?",
                    answers: ["Mauna Loa", "Mount Etna", "Mount Vesuvius", "Krakatoa"],
                    correct: 0
                }
            ]
        }
    };

    // Initialize quiz
    function initQuiz() {
        const category = document.getElementById('categorySelect').value;
        const difficulty = document.getElementById('difficultySelect').value;
        
        questions = questionDatabase[category][difficulty];
        currentQuestion = 0;
        score = 0;
        userAnswers = [];
        selectedAnswer = null;
        
        updateProgress();
        updateScore();
        showQuestion();
        showScreen(questionScreen);
    }

    // Show specific screen
    function showScreen(screen) {
        startScreen.classList.remove('active');
        questionScreen.classList.remove('active');
        resultScreen.classList.remove('active');
        screen.classList.add('active');
    }

    // Display current question
    function showQuestion() {
        const question = questions[currentQuestion];
        questionText.textContent = question.question;
        
        answersContainer.innerHTML = '';
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = answer;
            button.addEventListener('click', () => selectAnswer(index));
            answersContainer.appendChild(button);
        });
        
        nextBtn.disabled = true;
        selectedAnswer = null;
    }

    // Handle answer selection
    function selectAnswer(answerIndex) {
        if (selectedAnswer !== null) return;
        
        selectedAnswer = answerIndex;
        userAnswers[currentQuestion] = answerIndex;
        
        const buttons = answersContainer.querySelectorAll('.answer-btn');
        buttons.forEach((button, index) => {
            button.classList.add('disabled');
            if (index === answerIndex) {
                button.classList.add('selected');
            }
            if (index === questions[currentQuestion].correct) {
                button.classList.add('correct');
            } else if (index === answerIndex) {
                button.classList.add('incorrect');
            }
        });
        
        if (answerIndex === questions[currentQuestion].correct) {
            score++;
            updateScore();
        }
        
        nextBtn.disabled = false;
    }

    // Move to next question
    function nextQuestion() {
        currentQuestion++;
        
        if (currentQuestion >= questions.length) {
            showResults();
        } else {
            updateProgress();
            showQuestion();
        }
    }

    // Update progress bar
    function updateProgress() {
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        progressFill.style.width = progress + '%';
        progressText.textContent = `${currentQuestion + 1}/${questions.length}`;
    }

    // Update score display
    function updateScore() {
        scoreElement.textContent = score;
    }

    // Show final results
    function showResults() {
        const percentageScore = Math.round((score / questions.length) * 100);
        
        finalScore.textContent = score;
        totalQuestions.textContent = questions.length;
        percentage.textContent = percentageScore;
        
        // Set result message
        let message = '';
        let messageClass = '';
        
        if (percentageScore >= 90) {
            message = 'Excellent! Outstanding performance!';
            messageClass = 'excellent';
        } else if (percentageScore >= 70) {
            message = 'Good job! Well done!';
            messageClass = 'good';
        } else if (percentageScore >= 50) {
            message = 'Average performance. Keep practicing!';
            messageClass = 'average';
        } else {
            message = 'Keep studying and try again!';
            messageClass = 'poor';
        }
        
        resultMessage.textContent = message;
        resultMessage.className = `result-message ${messageClass}`;
        
        showScreen(resultScreen);
    }

    // Restart quiz
    function restartQuiz() {
        showScreen(startScreen);
    }

    // Review answers (placeholder for future implementation)
    function reviewAnswers() {
        alert('Review feature coming in Challenge 1!');
    }

    // Event listeners
    startBtn.addEventListener('click', initQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
    reviewBtn.addEventListener('click', reviewAnswers);
}); 