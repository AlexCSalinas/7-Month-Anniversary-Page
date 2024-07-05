
// Set the date for the one-year anniversary
const anniversaryDate = new Date('2024-12-02T00:00:00');

// Update the countdown every second
setInterval(() => {
    const now = new Date();
    const distance = anniversaryDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = `Countdown to 1 year: ${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
        clearInterval();
        document.getElementById('countdown').innerHTML = "Happy 1 Year Anniversary!";
    }
}, 1000);
const quizData = [
    {
        question: "Where did we first meet?",
        a: "The Diag at The University of Michigan",
        b: "Around Couzens room 4319",
        c: "Orientation",
        d: "In a class we had together",
        correct: "b"
    },
    {
        question: "When did you find out Alex liked you?",
        a: "Valentines Day",
        b: "Snowball fight",
        c: "After PCN",
        d: "Garba",
        correct: "c"
    },
    {
        question: "What is our favorite day of the week?",
        a: "Mondays",
        b: "Fridays",
        c: "Saturdays",
        d: "Thursdays",
        correct: "d"
    },
    {
        question: "Who had a birthday on the day we first met?",
        a: "Aiden Song",
        b: "Arnav Arora",
        c: "Kanye West",
        d: "Carlos Salinas",
        correct: "a"
    },
    {
        question: "Who saw us on the famous Thrursday Diag experience?",
        a: "Elliot Soule",
        b: "Julian Stephans",
        c: "Dev Patel",
        d: "Lebron James",
        correct: "a"
    },
    {
        question: "Can Alex dance well?",
        a: "No",
        b: "I'm not sure",
        c: "Not enough information",
        d: "Yes absolutley without a doubt",
        correct: "d"
    },
    {
        question: "What would Alex doodle in his notebook when he was daydreaming about you?",
        a: "Pictures of us together",
        b: "Your name - Francesca",
        c: "Spells to cast love upon us",
        d: "Lebron James",
        correct: "b"
    },
    // Add more questions as needed
];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

function buildQuiz() {
    const output = [];
    quizData.forEach((currentQuestion, questionNumber) => {
        const answers = [];
        for (const letter in currentQuestion) {
            if (letter !== 'question' && letter !== 'correct') {
                answers.push(
                    `<li>
                        <label>
                            <input type="radio" name="question${questionNumber}" value="${letter}">
                            ${letter} :
                            ${currentQuestion[letter]}
                        </label>
                    </li>`
                );
            }
        }
        output.push(
            `<div class="question"><strong> ${currentQuestion.question} </strong></div>
             <ul class="answers"> ${answers.join('')} </ul>`
        );
    });
    quizContainer.innerHTML = output.join('');
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;

    quizData.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correct) {
            numCorrect++;
            answerContainers[questionNumber].style.color = 'lightgreen';
        } else {
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${quizData.length} correct`;
}

buildQuiz();
submitButton.addEventListener('click', showResults);

// Slider functionality
const loveSlider = document.getElementById('loveSlider');
const newSliderContainer = document.getElementById('newSliderContainer');

loveSlider.addEventListener('input', function() {
    if (loveSlider.value == loveSlider.max) {
        newSliderContainer.style.display = 'block';
        newLoveSlider.value = newLoveSlider.max;
    }
});

// Memory matching game functionality
const memoryGame = document.getElementById('memoryGame');
const memoryNote = document.getElementById('memoryNote');
const noteText = document.getElementById('noteText');

const cardsArray = [
    { name: 'image1', img: 'images/image1.jpg', note: 'This is our first date!' },
    { name: 'image2', img: 'images/image2.jpg', note: 'This was the snowball fight!' },
    // Add more image paths and notes
    { name: 'image1', img: 'images/image1.jpg', note: 'This is our first date!' },
    { name: 'image2', img: 'images/image2.jpg', note: 'This was the snowball fight!' },
];

function createCard(card) {
    return `
        <div class="memory-card" data-name="${card.name}" data-note="${card.note}">
            <img class="front-face" src="${card.img}" alt="${card.name}">
            <div class="back-face">?</div>
        </div>
    `;
}

function initializeGame() {
    const shuffledCards = [...cardsArray].sort(() => 0.5 - Math.random());
    memoryGame.innerHTML = shuffledCards.map(createCard).join('');

    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => card.addEventListener('click', flipCard));
}

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (!firstCard || !secondCard) {
        console.error('checkForMatch called before two cards were flipped');
        return;
    }
    
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards();
        showMemoryNote();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function showMemoryNote() {
    if (!firstCard) {
        console.error('showMemoryNote called before a card was flipped');
        return;
    }
    const note = firstCard.dataset.note;
    noteText.textContent = note;
    memoryNote.style.display = 'block';

    setTimeout(() => {
        memoryNote.style.display = 'none';
    }, 3000);
}

initializeGame();







document.addEventListener('DOMContentLoaded', function() {
    const connections = [
    {
        category: "Snowball Fight",
        items: ["Rum", "Pizza", "Diag", "Cold"],
    },
    {
        category: "Places we have eaten together",
        items: ["Mojo", "Totoro", "Panda", "Savas"],
    },
    {
        category: "Current forms of communication",
        items: ["Phone", "Discord", "Teleparty", "Text"],
    },
    {
        category: "Gifts we have given each other",
        items: ["Mo", "Appa", "Ballmer", "Dancing men"],
    },
    ];

    const gameBoard = document.getElementById("game-board");
    const checkAnswersBtn = document.getElementById("check-answers");
    const resultDiv = document.getElementById("result");

    let selectedTiles = [];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createGameBoard() {
        const allItems = connections.flatMap((conn) => conn.items);
        shuffleArray(allItems);

        gameBoard.innerHTML = ''; // Clear any existing content
        allItems.forEach((item) => {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.textContent = item;
        tile.addEventListener("click", () => toggleTile(tile));
        gameBoard.appendChild(tile);
        });
    }

    function toggleTile(tile) {
        if (tile.classList.contains("selected")) {
            tile.classList.remove("selected");
            selectedTiles = selectedTiles.filter((t) => t !== tile);
        } else {
            if (selectedTiles.length < 4) {
                tile.classList.add("selected");
                selectedTiles.push(tile);
            }
        }
    }

    function checkAnswers() {
        if (selectedTiles.length !== 4) {
            resultDiv.textContent = "Please select exactly 4 tiles.";
            return;
        }
        const selectedItems = selectedTiles.map((tile) => tile.textContent);
        const correctConnection = connections.find((conn) =>
        conn.items.every((item) => selectedItems.includes(item))
        );
        if (correctConnection) {
            selectedTiles.forEach((tile) => {
                tile.classList.remove("selected");
                tile.classList.add("correct");
        });
        resultDiv.textContent = `Correct! Category: ${correctConnection.category}`;
        } else {
            resultDiv.textContent = "Incorrect. Try again!";
            selectedTiles.forEach((tile) => tile.classList.remove("selected"));
        }
        selectedTiles = [];
    }

    createGameBoard();
    checkAnswersBtn.addEventListener("click", checkAnswers);
});