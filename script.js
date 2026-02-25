// Quiz Questions and Answers
const quizData = [
    {
        question: "What is the capital of France?",
        choices: ["London", "Paris", "Berlin", "Madrid"],
        correctAnswer: 1
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        choices: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        choices: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        correctAnswer: 2
    },
    {
        question: "In what year did World War II end?",
        choices: ["1943", "1944", "1945", "1946"],
        correctAnswer: 2
    },
    {
        question: "What is the chemical symbol for gold?",
        choices: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2
    },
    {
        question: "Which country is home to the kangaroo?",
        choices: ["New Zealand", "Australia", "South Africa", "Brazil"],
        correctAnswer: 1
    },
    {
        question: "How many continents are there?",
        choices: ["5", "6", "7", "8"],
        correctAnswer: 2
    },
    {
        question: "What is the smallest prime number?",
        choices: ["0", "1", "2", "3"],
        correctAnswer: 2
    },
    {
        question: "Which element has the atomic number 1?",
        choices: ["Helium", "Hydrogen", "Lithium", "Beryllium"],
        correctAnswer: 1
    }
];

// Global variables
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let isAnswered = false;

// Initialize quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    isAnswered = false;
    
    showScreen('quizScreen');
    loadQuestion();
}

// Load current question
function loadQuestion() {
    const question = quizData[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;
    
    // Update progress
    document.getElementById('questionNumber').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = quizData.length;
    document.getElementById('currentScore').textContent = score;
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // Render choices
    renderChoices(question);
    
    // Update button states
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    document.getElementById('nextBtn').disabled = false;
    
    isAnswered = userAnswers[currentQuestionIndex] !== undefined;
    if (isAnswered) {
        disableChoices();
        highlightAnswer();
    } else {
        enableChoices();
    }
}

// Render choice buttons
function renderChoices(question) {
    const container = document.getElementById('choicesContainer');
    container.innerHTML = '';
    
    question.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice;
        button.onclick = () => selectAnswer(index);
        
        // If already answered, show the selection
        if (userAnswers[currentQuestionIndex] !== undefined) {
            if (userAnswers[currentQuestionIndex] === index) {
                button.classList.add('selected');
            }
        }
        
        container.appendChild(button);
    });
}

// Select answer
function selectAnswer(index) {
    if (isAnswered) return;
    
    const question = quizData[currentQuestionIndex];
    userAnswers[currentQuestionIndex] = index;
    
    // Check if correct
    if (index === question.correctAnswer) {
        score++;
    }
    
    isAnswered = true;
    
    // Update score display
    document.getElementById('currentScore').textContent = score;
    
    // Disable choices and highlight answer
    disableChoices();
    highlightAnswer();
}

// Highlight correct and selected answers
function highlightAnswer() {
    const question = quizData[currentQuestionIndex];
    const buttons = document.querySelectorAll('.choice-btn');
    
    buttons.forEach((button, index) => {
        if (index === question.correctAnswer) {
            button.classList.add('correct');
        }
        
        if (userAnswers[currentQuestionIndex] === index) {
            if (index !== question.correctAnswer) {
                button.classList.add('incorrect');
            }
        }
    });
}

// Disable choice buttons
function disableChoices() {
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.classList.add('disabled');
        btn.onclick = null;
    });
    document.getElementById('nextBtn').disabled = false;
}

// Enable choice buttons
function enableChoices() {
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.classList.remove('disabled');
    });
}

// Navigate to next question
function nextQuestion() {
    if (!isAnswered) {
        alert('Please select an answer before proceeding!');
        return;
    }
    
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
}

// Navigate to previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

// Show results
function showResults() {
    showScreen('resultScreen');
    
    // Calculate results
    const totalQuestions = quizData.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalTotal').textContent = totalQuestions;
    document.getElementById('percentage').textContent = percentage + '%';
    
    // Performance message
    let message = '';
    if (percentage >= 90) {
        message = 'Outstanding! You\'re a quiz master! 🌟';
    } else if (percentage >= 80) {
        message = 'Excellent! You know your stuff! 👏';
    } else if (percentage >= 70) {
        message = 'Good job! You did well! 😊';
    } else if (percentage >= 60) {
        message = 'Not bad! Keep learning! 📚';
    } else {
        message = 'Keep trying! You\'ll do better next time! 💪';
    }
    
    document.getElementById('performanceMessage').textContent = message;
    
    // Show detailed results
    showDetailedResults();
}

// Show detailed results
function showDetailedResults() {
    const detailsList = document.getElementById('detailsList');
    detailsList.innerHTML = '';
    
    quizData.forEach((question, index) => {
        const detail = document.createElement('div');
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        
        detail.className = 'detail-item ' + (isCorrect ? 'correct' : 'incorrect');
        
        const questionDiv = document.createElement('div');
        questionDiv.className = 'detail-question';
        questionDiv.textContent = (index + 1) + '. ' + question.question;
        
        const answerDiv = document.createElement('div');
        answerDiv.className = 'detail-answer';
        
        if (isCorrect) {
            answerDiv.textContent = '✓ Your answer: ' + question.choices[userAnswer];
        } else {
            answerDiv.textContent = '✗ Your answer: ' + question.choices[userAnswer] + 
                                   ' | Correct answer: ' + question.choices[question.correctAnswer];
        }
        
        detail.appendChild(questionDiv);
        detail.appendChild(answerDiv);
        detailsList.appendChild(detail);
    });
}

// Show screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Go home
function goHome() {
    showScreen('startScreen');
}

// Initialize - show start screen
showScreen('startScreen');
