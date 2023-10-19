let maxAttempts = 10;
let maxRange = 100;

let randomNumber;
let numGuess = 0;

const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");
const difficultySelect = document.querySelector("#difficulty");

let prevGuess = [];
let playGame = true;

function updateDifficulty(difficulty) {
    switch (difficulty) {
        case "easy":
            maxAttempts = 15;
            maxRange = 50;
            break;
        case "medium":
            maxAttempts = 10;
            maxRange = 100;
            break;
        case "hard":
            maxAttempts = 7;
            maxRange = 150;
            break;
        default:
            maxAttempts = 10;
            maxRange = 100;
    }
}

function updateIntroductionText() {
    const selectedDifficulty = difficultySelect.value;
    let text = `Try and guess a random number between 1 and ${maxRange}.`;
    switch (selectedDifficulty) {
        case "easy":
            text = `Try and guess a random number between 1 and ${maxRange}.`;
            break;
        case "medium":
            text = `Try and guess a random number between 1 and ${maxRange}.`;
            break;
        case "hard":
            text = `Try and guess a random number between 1 and ${maxRange}.`;
            break;
    }
    const maxAttemptsText = maxAttempts - numGuess;
    document.getElementById("introduction").textContent = `${text} You have ${maxAttemptsText} attempts to guess the right number.`;
}

difficultySelect.addEventListener("change", function () {
    const selectedDifficulty = difficultySelect.value;
    updateDifficulty(selectedDifficulty);
    updateIntroductionText();
    initializeGame();
});

function initializeGame() {
    randomNumber = generateRandomNumber();
    prevGuess = [];
    numGuess = 0;
    playGame = true;
    guessSlot.innerHTML = "";
    remaining.innerHTML = maxAttempts;
    userInput.value = "";
    userInput.removeAttribute("disabled");
    lowOrHi.innerHTML = "";
    document.querySelector("#newGame").style.display = "none";
}

function generateRandomNumber() {
    return Math.floor(Math.random() * maxRange + 1);
}

submit.addEventListener("click", function (e) {
    e.preventDefault();
    if (playGame) {
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    }
    return false;
});

function validateGuess(guess) {
    if (isNaN(guess) || guess < 1 || guess > maxRange) {
        alert(`Please enter a valid number between 1 and ${maxRange}.`);
    } else {
        prevGuess.push(guess);
        numGuess++;
        displayGuess(guess);
        checkGuess(guess);
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage('You guessed it right');
        endGame();
    } else if (guess < randomNumber) {
        displayMessage('Number is too LOW');
    } else if (guess > randomNumber) {
        displayMessage('Number is too HIGH');
    }
}

function displayGuess(guess) {
    userInput.value = "";
    guessSlot.innerHTML += `${guess} `;
    if (numGuess === maxAttempts) {
        remaining.innerHTML = "0";
        displayMessage(`Game Over. Random number was ${randomNumber}`);
        endGame();
    } else {
        remaining.innerHTML = maxAttempts - numGuess;
    }
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    userInput.value = "";
    userInput.setAttribute("disabled", "");
    const newGameButton = document.querySelector("#newGame");
    newGameButton.style.display = "block";

    newGameButton.addEventListener("click", function () {
        newGameButton.style.display = "none";
        initializeGame();
    });
}

difficultySelect.addEventListener("change", function () {
    const selectedDifficulty = difficultySelect.value;
    updateDifficulty(selectedDifficulty);
    initializeGame();
});

initializeGame();