document.addEventListener("DOMContentLoaded", function() {
    const instructionContent = `
        <h1>.</h1>
        <h1>Exploare Sudoku</h1>
        <h1>.</h1>
        <div class="instruction-section">
            <div class="section-header">
                <span>History of Sudoku</span>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="section-content">
                <p>Sudoku originated in the late 19th century and gained widespread popularity in the 1980s.</p>
            </div>
        </div>
        <div class="instruction-section">
            <div class="section-header">
                <span>Game Tips and Strategies</span>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="section-content">
                <p>
                Sudoku is a logic-based puzzle game played on a 9x9 grid, divided into smaller 3x3 boxes. The objective is to fill each cell with a number from 1 to 9, ensuring that each number appears only once in every row, column, and 3x3 box. Here are the basic steps to play Sudoku:
                    <ol>
                    <li><b>Understand the game board:</b> Familiarize yourself with the 9x9 grid and the smaller 3x3 boxes. Some cells will already contain numbers, known as "givens" or "clues." These numbers cannot be changed and will help you solve the puzzle.
                    Scan rows, columns, and boxes: Look for empty cells and check which numbers are already present in the corresponding row, column, and 3x3 box. Eliminate those numbers as possibilities for the empty cell.</li>

                    <li><b>Use the process of elimination:</b> By eliminating numbers already present in rows, columns, and boxes, you can narrow down the possible numbers for each empty cell.</li>

                    <li><b>Practice pencil marking:</b> Lightly note the possible numbers for each cell using small pencil marks in the corner of the cell. As you eliminate possibilities, erase the pencil marks until only one number remains for each cell.</li>

                    <li><b>Identify patterns:</b> Look for patterns in the puzzle, such as the presence of only two possible numbers in a row, column, or box. This will help you solve more challenging puzzles.</li>

                    <li><b>Practice and patience:</b> Sudoku puzzles can range from easy to extremely difficult. Start with simpler puzzles to build your skills and confidence, and don't be afraid to take breaks if you get stuck.</li></ol>
                    Sudoku is a fun and engaging puzzle game that can help improve logic and problem-solving skills. Enjoy playing, and happy solving!
                </p>
            </div>
        </div>
        <div class="instruction-section">
            <div class="section-header">
                <span>Fun Facts of Sudoku</span>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="section-content">
                <p>Did you know? The name Sudoku is short for "Suji wa dokushin ni kagiru" which means "the digits must be single."</p>
            </div>
        </div>
        <div class="instruction-section">
            <div class="section-header">
                <span>Tips and Trics</span>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="section-content">
                <p>Here is some links for you to visit if you are interested knowing more tips and tricks about this puzzle. Enjoy!<ul>
                <li>Visit <a href="https://www.conceptispuzzles.com/index.aspx?uri=puzzle/sudoku/techniques"target="_blank">Conceptis Puzzles</a>.</li>
                <li>Visit <a href="https://bestofsudoku.com/sudoku-strategy" target="_blank">Arkadium</a>.</li>
                <li>Visit <a href="https://masteringsudoku.com/sudoku-tips-tricks/" target="_blank">Mestering Sudoku</a>.</li>
            <ul></p>
            </div>
        </div>
        <div class="instruction-section">
            <div class="section-header">
                <span>Recent Scores</span>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="section-content">
                <table id="recent-scores-table">
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Game Category</th>
                            <th>Score</th>
                            <th>Time Taken</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Recent scores will be dynamically inserted here -->
                    </tbody>
                </table>
                <div id="highest-score">
                    <!-- Highest score will be displayed here -->
                </div>
            </div>
        </div>
    `;

    document.getElementById("instruction-corner").innerHTML = instructionContent;
    // Load recent scores when the page loads
    loadRecentScores();

    const sections = document.querySelectorAll(".instruction-section");

    sections.forEach(section => {
        const header = section.querySelector(".section-header");
        header.addEventListener("click", () => {
            // Close any open sections
            sections.forEach(sec => {
                if (sec !== section) {
                    sec.classList.remove("active");
                }
            });
            // Toggle the clicked section
            section.classList.toggle("active");
        });
    });

    loadRecentScores();
});

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

function saveScore(category, score, time) {
    const recentScores = JSON.parse(localStorage.getItem('recentScores')) || [];
    recentScores.push({ category, score, time });
    if (recentScores.length > 5) {
        recentScores.shift(); // Keep only the latest 5 scores
    }
    localStorage.setItem('recentScores', JSON.stringify(recentScores));
    loadRecentScores(); // Update the table
}
function toggleSection(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector("i");
    const isOpen = content.style.display === "block";

    // Close all sections
    document.querySelectorAll(".section-content").forEach(section => {
        section.style.display = "none";
    });

    // Reset all icons
    document.querySelectorAll(".section-header i").forEach(icon => {
        icon.className = "fas fa-chevron-down";
    });

    if (!isOpen) {
        content.style.display = "block";
        icon.className = "fas fa-chevron-up";
    }
}
