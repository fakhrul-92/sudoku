var numSelected = null;
var tileSelected = null;
var errors = 0;
var currentCategory = "Easy"; // Default category
var currentPuzzleIndex = 0; // Index of the current puzzle
var numberUsage = {}; // Track number usage
var timerStarted = false;
var numberMatched = 0;

window.onload = function() {
    setupCategorySelector();
    setupPuzzleSelector();
    setGame();
    updateGameMessage();

    document.getElementById("start-reset-button").addEventListener("click", handleStartReset);
    document.getElementById("pause-resume-button").addEventListener("click", handlePauseResume);
    loadRecentScores(); // Load recent scores on page load
};

function setupCategorySelector() {
    let selector = document.getElementById("category-selector");
    selector.addEventListener("change", function() {
        currentCategory = this.value;
        currentPuzzleIndex = 0; // Reset puzzle index when category changes
        setupPuzzleSelector();
        setGame();
        resetTimer(); // Reset the timer when category changes
        updateGameMessage(); // Update game message when category changes
    });

    Object.keys(puzzleData).forEach(category => {
        let option = document.createElement("option");
        option.value = category;
        option.innerText = category;
        selector.appendChild(option);
    });

    // Trigger initial setup for the puzzle selector
    setupPuzzleSelector();
}

function setupPuzzleSelector() {
    let selector = document.getElementById("puzzle-selector");
    selector.innerHTML = ''; // Clear existing options

    let puzzles = puzzleData[currentCategory].puzzles;
    puzzles.forEach((_, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.innerText = `Puzzle ${index + 1}`;
        selector.appendChild(option);
    });

    selector.addEventListener("change", function() {
        currentPuzzleIndex = parseInt(this.value);
        setGame();
        resetTimer(); // Reset the timer when a new puzzle is selected
    });
}

function setGame() {
    errors = 0;
    numberUsage = {}; // Reset number usage
    numberMatched = 0; // Reset number matched
    score = 0; // Reset score
    document.getElementById("errors").innerText = "Errors: " + errors;
    document.getElementById("board").innerHTML = ""; // Clear the board
    document.getElementById("digits").innerHTML = ""; // Clear the digits
    timerStarted = false; // Reset timerStarted flag
    displayScoreCard(score); // Reset score display

    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    let board = puzzleData[currentCategory].puzzles[currentPuzzleIndex];
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
                trackNumberUsage(board[r][c]);
            }
            tile.classList.add("tile");
            // Add alternating colors to subgrids
            if (Math.floor(r / 3) % 2 === 0) {
                if (Math.floor(c / 3) % 2 === 0) {
                    tile.classList.add("subgrid-light");
                } else {
                    tile.classList.add("subgrid-dark");
                }
            } else {
                if (Math.floor(c / 3) % 2 === 0) {
                    tile.classList.add("subgrid-dark");
                } else {
                    tile.classList.add("subgrid-light");
                }
            }
            tile.addEventListener("click", selectTile);
            document.getElementById("board").append(tile);
        }
    }
    updateNumberAvailability(); // Update the number availability based on initial setup
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
        clearHighlights();
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
    highlightTiles(numSelected.id);

    // Auto-start the timer when a number is selected
    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        let coords = this.id.split("-"); // ["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (puzzleData[currentCategory].solutions[currentPuzzleIndex][r][c] == numSelected.id) {
            this.innerText = numSelected.id;
            numberMatched++;
            trackNumberUsage(numSelected.id);
            highlightTiles(numSelected.id); // Highlight newly filled number
            checkCompletion(); // Check for puzzle completion
            updateNumberAvailability(); // Update the number availability
            updateContinuousScore(1); // Update continuous score
        } else {
            errors += 1;
            document.getElementById("errors").innerText = "Errors: " + errors;
            if (errors > maxMistakes) {
                showPopup("You have made more than " + maxMistakes + " mistakes. Game over!");
                stopTimer(); // Stop the timer
                calculateAndDisplayFinalScore(currentCategory, numberMatched, errors, 0, 0); // No accomplish or time bonus
            }
        }
    }
}

function highlightTiles(number) {
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        if (tile.innerText === number) {
            tile.classList.add("highlight");
        }
    });
}

function clearHighlights() {
    const tiles = document.querySelectorAll(".tile.highlight");
    tiles.forEach(tile => {
        tile.classList.remove("highlight");
    });
}

function trackNumberUsage(number) {
    if (!numberUsage[number]) {
        numberUsage[number] = 0;
    }
    numberUsage[number]++;
}

function updateNumberAvailability() {
    for (let i = 1; i <= 9; i++) {
        let numberElement = document.getElementById(i.toString());
        if (numberUsage[i] >= 9) {
            numberElement.style.color = "gray";
            numberElement.style.pointerEvents = "none";
        } else {
            numberElement.style.color = "";
            numberElement.style.pointerEvents = "";
        }
    }
}

function checkCompletion() {
    const tiles = document.querySelectorAll(".tile");
    let isComplete = true;
    tiles.forEach(tile => {
        let coords = tile.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        if (tile.innerText !== puzzleData[currentCategory].solutions[currentPuzzleIndex][r][c]) {
            isComplete = false;
        }
    });
    if (isComplete) {
        stopTimer(); // Stop the timer on successful completion
        calculateAndDisplayFinalScore(currentCategory, numberMatched, errors, getAccomplishBonus(), timeLeft); // Accomplish and time bonus
    }
}

function showPopup(message) {
    const existingPopup = document.querySelector(".popup");
    if (existingPopup) {
        existingPopup.remove(); // Remove existing popup if present
    }
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `<p>${message}</p><button onclick="resetGame()">Try Again</button>`;
    document.getElementById("sudoku-corner").appendChild(popup);
}

function resetGame() {
    document.querySelector(".popup")?.remove(); // Remove popup if it exists
    const startResetButton = document.getElementById("start-reset-button");
    const startResetIcon = document.getElementById("start-reset-icon");
    const startResetText = startResetButton.querySelector("span");
    startResetIcon.className = "fas fa-play";
    startResetText.innerText = "Start";
    document.getElementById("pause-resume-button").disabled = true; // Disable pause button
    resetTimer(); // Reset the timer
    setGame(); // Restart the game
}

function updateGameMessage() {
    const gameMessage = document.getElementById("game-message");
    let time, mistakes;

    switch (currentCategory) {
        case 'Easy':
            time = "2:00";
            mistakes = 8;
            break;
        case 'Medium':
            time = "2:30";
            mistakes = 5;
            break;
        case 'Hard':
            time = "2:45";
            mistakes = 3;
            break;
        case 'Expert':
            time = "3:00";
            mistakes = 0;
            break;
        default:
            time = "2:00";
            mistakes = 8;
    }

    gameMessage.innerText = `Good luck! To solve this puzzle you have ${time} minutes and at max you are allowed to make ${mistakes} mistakes.`;
    document.getElementById("time-right").innerText = time;
}

function handleStartReset() {
    const startResetButton = document.getElementById("start-reset-button");
    const startResetIcon = document.getElementById("start-reset-icon");
    const startResetText = startResetButton.querySelector("span");

    if (startResetIcon.classList.contains("fa-play")) {
        startTimer();
        startResetIcon.className = "fas fa-redo";
        startResetText.innerText = "Reset";
        document.getElementById("pause-resume-button").disabled = false; // Enable pause button
    } else {
        resetGame();
    }
}

function handlePauseResume() {
    const pauseResumeButton = document.getElementById("pause-resume-button");
    const pauseResumeIcon = document.getElementById("pause-resume-icon");
    const pauseResumeText = pauseResumeButton.querySelector("span");

    if (pauseResumeIcon.classList.contains("fa-pause")) {
        pauseTimer();
        pauseResumeIcon.className = "fas fa-play";
        pauseResumeText.innerText = "Resume";
    } else {
        resumeTimer();
        pauseResumeIcon.className = "fas fa-pause";
        pauseResumeText.innerText = "Pause";
    }
}

function getAccomplishBonus() {
    switch (currentCategory) {
        case 'Easy':
            return 100;
        case 'Medium':
            return 200;
        case 'Hard':
            return 300;
        case 'Expert':
            return 500;
        default:
            return 100;
    }
}

