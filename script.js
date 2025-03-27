// Game variables
const words = ['APPLE', 'BANANA', 'ORANGE', 'GRAPE', 'STRAWBERRY', 'KIWI', 'MANGO', 'WATERMELON', 'PINEAPPLE', 'AVOCADO', 'BLUEBERRY', 'CHERRY', 'LEMON', 'APRICOT', 'FIG', 'PLUM', 'PAPAYA', 'GRAPEFRUIT', 'PEACH', 'PEAR'];
let selectedWord = '';
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;

// DOM elements
const wordDisplay = document.getElementById('word-display');
const hangmanDrawing = document.getElementById('hangman-drawing');
const keyboard = document.getElementById('keyboard');
const message = document.getElementById('message');
const newGameBtn = document.getElementById('new-game-btn');

// Hangman stages
const hangmanStages = [
    `
  +---+
  |   |
      |
      |
      |
      |
=========`,
    `
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
    `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
    `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
    `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
    `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
    `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`
];

// Initialize game
function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    message.textContent = '';
    createKeyboard();
    updateDisplay();
}

// Create keyboard
function createKeyboard() {
    keyboard.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement('button');
        button.textContent = letter;
        button.className = 'letter-btn';
        button.addEventListener('click', () => {
            if (!guessedLetters.includes(letter)) {
                guessLetter(letter);
                button.disabled = true;
            }
        });
        keyboard.appendChild(button);
    }
}

// Guess letter
function guessLetter(letter) {
    guessedLetters.push(letter);
    if (!selectedWord.includes(letter)) {
        wrongGuesses++;
    }
    updateDisplay();
}

// Update game display
function updateDisplay() {
    const displayWord = selectedWord
        .split('')
        .map(letter => guessedLetters.includes(letter) ? letter : '_')
        .join(' ');
    wordDisplay.textContent = displayWord;
    hangmanDrawing.textContent = hangmanStages[wrongGuesses];
    checkGameStatus(displayWord);
}

// Check game status
function checkGameStatus(displayWord) {
    if (!displayWord.includes('_')) {
        message.textContent = 'Woohoo! You Won! 🎉'; // More joyful with emoji
        message.style.color = '#ff66b2'; // Matches the pink button
        disableAllButtons();
    }
    if (wrongGuesses >= maxWrongGuesses) {
        message.textContent = `Game Over! The word was: ${selectedWord}`;
        message.style.color = 'red';
        disableAllButtons();
    }
}

// Disable all keyboard buttons
function disableAllButtons() {
    const buttons = keyboard.getElementsByClassName('letter-btn');
    for (let button of buttons) {
        button.disabled = true;
    }
}

// New game button event listener
newGameBtn.addEventListener('click', startGame);

// Start game when page loads
document.addEventListener('DOMContentLoaded', startGame);