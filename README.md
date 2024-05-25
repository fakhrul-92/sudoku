Sudoku Game Application
=======================

Overview
--------
The Sudoku Game Application is a web-based platform designed to allow users to play Sudoku, track scores, and view related information such as game tips and user history. The application consists of three main sections: Update Corner, Sudoku Corner, and Instructions Corner. Additionally, users can switch between light and dark themes using a theme toggle button.

File Structure
--------------
- index.html: Main HTML file
- sudoku.css: CSS file for styling the Sudoku game and related elements
- instructions.css: CSS file for styling the instructions section
- puzzleData.js: JavaScript file for Sudoku puzzles and solutions
- sudoku.js: JavaScript file for core Sudoku functionality
- timer.js: JavaScript file for timer functionality
- score.js: JavaScript file for score calculation and display
- instructions.js: JavaScript file for managing the instructions and updates
- theme.js: JavaScript file for theme switching functionality

Instructions
------------
1. Clone the repository to your local machine.
2. Open `index.html` in a web browser to launch the application.

Main Features
-------------
1. **Sudoku Functionality**:
   - Display different Sudoku puzzles based on the selected difficulty level (Easy, Medium, Hard, Expert) and puzzle number.
   - Highlight existing and newly filled numbers on the board.
   - Automatically start the timer when a number is selected from the number row.
   - Check for puzzle completion and display a popup with a score summary.
   - Update continuous score and final score based on various criteria (number matched, errors, accomplishment bonus, time bonus).

2. **Score Management**:
   - Calculate and display scores.
   - Save and load recent scores to/from local storage.
   - Display recent scores and the highest score in a table format.

3. **Instructions and Update Corner**:
   - Instructions corner divided into subsections: History of Sudoku, Game Tips and Strategies, Fun Facts of Sudoku, User Gaming History, Recent Scores.
   - Each subsection is collapsible/expandable with an 'i' or down arrow icon.
   - Only one subsection can be expanded at a time.

4. **Popup Functionality**:
   - Display a popup with the score summary upon puzzle completion.
   - Include a close button in the popup to remove it from the screen.

5. **Theme Switching**:
   - A switch button in the top bar to toggle between light and dark themes.
   - Appropriate styling for light and dark themes.

How to Use
----------
1. **Start a Game**:
   - Select the difficulty level and puzzle number from the dropdown menus.
   - Click on the "Start" button to begin the game. The timer will start automatically when you select a number from the number row.

2. **Pause/Resume the Game**:
   - Click the "Pause" button to pause the game. The button will change to "Resume" which you can click to continue the game.

3. **Reset the Game**:
   - Click the "Reset" button to restart the game with the same puzzle and difficulty level.

4. **Theme Switching**:
   - Use the theme toggle button in the top bar to switch between light and dark themes.

5. **Viewing Scores**:
   - The score card will be updated continuously as you play. 
   - Upon completion of the puzzle, a popup will display the final score and the breakdown of points.

6. **Instructions and Updates**:
   - Click on the 'i' or down arrow icon next to each subsection in the Instructions Corner to view the content.
   - Only one subsection can be expanded at a time to ensure a clean and user-friendly interface.

Development Notes
-----------------
1. **Auto Timer Start**:
   - The timer starts automatically when a number is selected from the number row for all puzzles and categories.

2. **Score Calculation**:
   - Score is calculated based on game category, number matched, errors, accomplishment bonus, and time bonus.
   - Recent scores are saved and displayed from local storage.

3. **Highlighting**:
   - Existing and newly filled numbers are highlighted when a number is selected.

4. **Theming**:
   - Light and dark themes are available and can be toggled using the switch button in the top bar.
