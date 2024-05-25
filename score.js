let score = 0;
let finalScore = 0;

function calculateScore(gameCategory, numberMatched, errors, accomplishBonus, timeBonus) {
    let categoryMultiplier;
    switch (gameCategory) {
        case 'Easy':
            categoryMultiplier = 1;
            break;
        case 'Medium':
            categoryMultiplier = 1.5;
            break;
        case 'Hard':
            categoryMultiplier = 2;
            break;
        case 'Expert':
            categoryMultiplier = 3;
            break;
        default:
            categoryMultiplier = 1;
    }

    let totalScore = (numberMatched * 10 - errors * 20 + accomplishBonus) + (timeBonus * categoryMultiplier);
    return totalScore;
}

function updateContinuousScore(numberMatched) {
    score += numberMatched * 10;
    displayScoreCard(score);
}

function calculateAndDisplayFinalScore(gameCategory, numberMatched, errors, accomplishBonus, remainingTimeSeconds) {
    let timeBonus;
    switch (gameCategory) {
        case 'Easy':
            timeBonus = remainingTimeSeconds * 1;
            break;
        case 'Medium':
            timeBonus = remainingTimeSeconds * 2.5;
            break;
        case 'Hard':
            timeBonus = remainingTimeSeconds * 3.5;
            break;
        case 'Expert':
            timeBonus = remainingTimeSeconds * 5;
            break;
        default:
            timeBonus = remainingTimeSeconds * 1;
    }

    finalScore = calculateScore(gameCategory, numberMatched, errors, accomplishBonus, timeBonus);
    displayScoreSummary(gameCategory, numberMatched, errors, accomplishBonus, timeBonus, finalScore);
    saveScore(gameCategory, finalScore, formatTime(totalTime - remainingTimeSeconds));
}

function displayScoreCard(score) {
    const scoreCard = document.getElementById('score-card');
    scoreCard.innerText = `Score: ${score}`;
}

function displayScoreSummary(gameCategory, numberMatched, errors, accomplishBonus, timeBonus, finalScore) {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
        <h2>Your Score</h2>
        <table class="score-table">
            <tr>
                <th style="color: black;">Game Category</th>
                <td style="color: black;">${gameCategory}</td>
            </tr>
            <tr>
                <th>Number Matched</th>
                <td>${numberMatched * 10}</td>
            </tr>
            <tr>
                <th>Errors</th>
                <td>-${errors * 20}</td>
            </tr>
            <tr>
                <th>Accomplishment Bonus</th>
                <td>${accomplishBonus}</td>
            </tr>
            <tr>
                <th>Time Bonus</th>
                <td>${timeBonus}</td>
            </tr>
            <tr>
                <th style="color: black;">Total Score</th>
                <td style="color: black;">${finalScore}</td>
            </tr>
        </table>
        <button onclick="resetGame()">Try Again</button>
    `;
    document.getElementById("sudoku-corner").appendChild(popup);
    loadRecentScores(); // Update the recent scores after displaying the final score
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function saveScore(category, score, time) {
    const recentScores = JSON.parse(localStorage.getItem('recentScores')) || [];
    recentScores.push({ category, score, time });
    if (recentScores.length > 5) {
        recentScores.shift(); // Keep only the latest 5 scores
    }
    localStorage.setItem('recentScores', JSON.stringify(recentScores));
    loadRecentScores(); // Update the table
}

function loadRecentScores() {
    const recentScores = JSON.parse(localStorage.getItem('recentScores')) || [];
    const scoresTableBody = document.querySelector("#recent-scores-table tbody");
    scoresTableBody.innerHTML = ''; // Clear existing rows

    recentScores.forEach((score, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${score.category}</td>
            <td>${score.score}</td>
            <td>${score.time}</td>
        `;
        scoresTableBody.appendChild(row);
    });

    const highestScore = recentScores.reduce((max, score) => score.score > max.score ? score : max, recentScores[0] || { score: 0, category: '', time: '' });
    document.getElementById("highest-score").innerText = highestScore.score > 0 ? `Highest Score: ${highestScore.score} in ${highestScore.category} category, Time Taken: ${highestScore.time}` : 'No scores available';
}
