const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");

const categorySelect = document.getElementById("category");

const interviewSection =
    document.getElementById("interviewSection");

const resultSection =
    document.getElementById("resultSection");

const questionText =
    document.getElementById("questionText");

const answerInput =
    document.getElementById("answerInput");

const feedback =
    document.getElementById("feedback");

const timerDisplay =
    document.getElementById("timer");

const questionNumber =
    document.getElementById("questionNumber");

const finalScore =
    document.getElementById("finalScore");

let currentCategory = "";
let currentQuestions = [];

let currentIndex = 0;
let score = 0;

let timer;
let timeLeft = 60;

startBtn.addEventListener("click", startInterview);
submitBtn.addEventListener("click", submitAnswer);
nextBtn.addEventListener("click", nextQuestion);

function startInterview() {

    currentCategory = categorySelect.value;

    currentQuestions =
        [...questions[currentCategory]];

    shuffleArray(currentQuestions);

    currentIndex = 0;
    score = 0;

    document.querySelector(".selection-panel")
        .classList.add("hidden");

    interviewSection.classList.remove("hidden");

    loadQuestion();
}

function loadQuestion() {

    if (currentIndex >= 5) {
        showResult();
        return;
    }

    questionNumber.textContent =
        `Question ${currentIndex + 1} of 5`;

    questionText.textContent =
        currentQuestions[currentIndex];

    answerInput.value = "";

    feedback.innerHTML = "";

    startTimer();
}

function startTimer() {

    clearInterval(timer);

    timeLeft = 60;

    timerDisplay.textContent = timeLeft;

    timer = setInterval(() => {

        timeLeft--;

        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            feedback.innerHTML =
                "⏰ Time is up! Move to next question.";

        }

    }, 1000);
}

function submitAnswer() {

    const answer =
        answerInput.value.trim();

    if (answer.length === 0) {

        feedback.innerHTML =
            "⚠ Please enter an answer.";

        return;
    }

    clearInterval(timer);

    const result =
        evaluateAnswer(answer);

    score += result.points;

    feedback.innerHTML =
        `<strong>Score:</strong> ${result.points}/10 <br><br>
         <strong>Feedback:</strong> ${result.feedback}`;
}

function evaluateAnswer(answer) {

    const words =
        answer.split(" ").length;

    let points = 0;
    let message = "";

    if (words >= 50) {

        points = 10;

        message =
            "Excellent answer. Detailed and well explained.";

    }
    else if (words >= 30) {

        points = 8;

        message =
            "Good answer. Add a few more details.";

    }
    else if (words >= 15) {

        points = 6;

        message =
            "Average answer. Try explaining more clearly.";

    }
    else {

        points = 3;

        message =
            "Very short answer. Add more information.";

    }

    return {
        points,
        feedback: message
    };
}

function nextQuestion() {

    clearInterval(timer);

    currentIndex++;

    loadQuestion();
}

function showResult() {

    interviewSection.classList.add("hidden");

    resultSection.classList.remove("hidden");

    const percentage =
        ((score / 50) * 100).toFixed(1);

    let rating = "";

    if (percentage >= 85) {

        rating = "🌟 Excellent";

    } else if (percentage >= 70) {

        rating = "✅ Good";

    } else if (percentage >= 50) {

        rating = "👍 Average";

    } else {

        rating = "📚 Needs Improvement";
    }

    finalScore.innerHTML = `
        Total Score: ${score}/50 <br><br>
        Percentage: ${percentage}% <br><br>
        Rating: ${rating}
    `;
}

function shuffleArray(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [array[i], array[j]] =
        [array[j], array[i]];
    }
}