document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const quizQuestions = [
        {
            question: "What is the standard size of a Sudoku grid?",
            answers: {
                a: '8x8',
                b: '9x9',
                c: '10x10',
                d: '7x7'
            },
            correctAnswer: 'b'
        },
        {
            question: "How many regions does a standard Sudoku have?",
            answers: {
                a: '6',
                b: '8',
                c: '9',
                d: '12'
            },
            correctAnswer: 'c'
        },
        {
            question: "Which of these is not a valid Sudoku number?",
            answers: {
                a: '5',
                b: '1',
                c: '0',
                d: '9'
            },
            correctAnswer: 'c'
        },
        {
            question: "What is the minimum number of clues a Sudoku puzzle can have while still being solvable?",
            answers: {
                a: '17',
                b: '25',
                c: '22',
                d: '19'
            },
            correctAnswer: 'a'
        },
        {
            question: "In which country did Sudoku originally become popular before gaining worldwide fame?",
            answers: {
                a: 'United States',
                b: 'Japan',
                c: 'Germany',
                d: 'France'
            },
            correctAnswer: 'b'
        },
        {
            question: "What does the word 'Sudoku' mean in Japanese?",
            answers: {
                a: 'Single number',
                b: 'Place of numbers',
                c: 'Number alone',
                d: 'Number placement'
            },
            correctAnswer: 'c'
        },
        {
            question: "Which strategy involves looking for numbers that are the only ones missing in a row, column, or block?",
            answers: {
                a: 'Scanning',
                b: 'Pencil marking',
                c: 'Counting',
                d: 'Bifurcation'
            },
            correctAnswer: 'a'
        }
    ];

    function buildQuiz() {
        const output = [];
        quizQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];
            for (const letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            // Arrange the answers into rows
            const answerRows = [
                answers.slice(0, 2).join(''), // First row (answers a and b)
                answers.slice(2).join('') // Second row (answers c and d)
            ];

            output.push(
                `<div class="question">${questionNumber + 1}. ${currentQuestion.question}</div>
                 <div class="answers">
                    <div>${answerRows[0]}</div>
                    <div>${answerRows[1]}</div>
                 </div>`
            );
        });
        quizContainer.innerHTML = output.join('');
    }

    function showResults() {
        let score = 0;
        quizQuestions.forEach((question, questionNumber) => {
            const answerContainer = quizContainer.querySelector('.answers:nth-child(' + (questionNumber * 2 + 2) + ')');
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;
            if (userAnswer === question.correctAnswer) {
                score++;
            }
        });
        resultsContainer.innerHTML = `Score: ${score} out of ${quizQuestions.length}`;
    }

    submitButton.addEventListener('click', showResults);
    buildQuiz();
});
