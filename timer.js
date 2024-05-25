let timerInterval;
let timeLeft;
let maxMistakes;
let isPaused = false;

function startTimer() {
    setTimerAndMistakes();

    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showPopup("Your time is up!");
        } else {
            timeLeft--;
            updateTimerBar();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isPaused = true;
}

function resumeTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showPopup("Your time is up!");
        } else {
            timeLeft--;
            updateTimerBar();
        }
    }, 1000);
    isPaused = false;
}

function setTimerAndMistakes() {
    const category = currentCategory;

    switch (category) {
        case 'Easy':
            timeLeft = 120; // 2 minutes
            maxMistakes = 8;
            break;
        case 'Medium':
            timeLeft = 150; // 2:30 minutes
            maxMistakes = 5;
            break;
        case 'Hard':
            timeLeft = 165; // 2:45 minutes
            maxMistakes = 3;
            break;
        case 'Expert':
            timeLeft = 180; // 3 minutes
            maxMistakes = 0;
            break;
        default:
            timeLeft = 120; // Default to Easy settings
            maxMistakes = 8;
    }

    updateGameMessage(); // Update the message with the new time and mistake limits
}

function updateTimerBar() {
    const timerBar = document.getElementById("timer-bar");
    const timerBarContainer = document.getElementById("timer-bar-container");
    const timeDisplayLeft = document.getElementById("time-left");
    const totalTime = getTimeByCategory(currentCategory);

    const minutesLeft = Math.floor(timeLeft / 60);
    const secondsLeft = timeLeft % 60;
    const timeLeftFormatted = `${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;

    timerBar.style.width = `${(timeLeft / totalTime) * 100}%`;
    timeDisplayLeft.innerText = timeLeftFormatted;

    // Add blinking effect if timeLeft is less than 25%
    if (timeLeft / totalTime < 0.25) {
        timerBar.classList.add("blinking");
        timerBarContainer.classList.add("blinking-border");
    } else {
        timerBar.classList.remove("blinking");
        timerBarContainer.classList.remove("blinking-border");
    }
}

function getTimeByCategory(category) {
    switch (category) {
        case 'Easy':
            return 120;
        case 'Medium':
            return 150;
        case 'Hard':
            return 165;
        case 'Expert':
            return 180;
        default:
            return 120;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    setTimerAndMistakes(); // Reset time and mistakes based on the current category
    document.getElementById("start-reset-button").disabled = false; // Enable start button
    document.getElementById("pause-resume-button").disabled = true; // Disable pause button
    updateTimerBar();
}

function stopTimer() {
    clearInterval(timerInterval);
}
