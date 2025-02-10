// Global variables to keep track of the score and the current letter
let score = 0;
let currentLetter = '';
let correctImage = '';

// Function to start the countdown and show the random letter
function startCountdown() {
    // Hide the "Ready" button after it is clicked
    document.getElementById('readyButton').style.display = 'none';

    let countdownElement = document.getElementById('countdown');
    let letterDisplayElement = document.getElementById('letterDisplay');
    let timeLeft = 3;

    // Show countdown
    countdownElement.innerHTML = `Starting in: ${timeLeft}`;
    
    // Countdown timer
    let countdownInterval = setInterval(function() {
        timeLeft--;
        countdownElement.innerHTML = `Starting in: ${timeLeft}`;
        
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = '';
            showRandomLetter();
        }
    }, 1000);
}

// Function to show a random letter after countdown
function showRandomLetter() {
    // Get a random letter from A-Z
    currentLetter = getRandomLetter();
    correctImage = `Images/${currentLetter}.png`; // Image source for the correct letter
    
    let letterDisplayElement = document.getElementById('letterDisplay');
    letterDisplayElement.innerHTML = `Letter: ${currentLetter}`;
    letterDisplayElement.style.display = 'block';

    // Show options for the user to choose
    generateOptions(currentLetter);
}

// Function to get a random letter from A to Z
function getRandomLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[Math.floor(Math.random() * 26)];
}

// Function to generate random options
function generateOptions(correctLetter) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let options = [];

    // Add the correct option (with image)
    options.push(correctLetter);

    // Add 2 random incorrect letters (ensure no repeats)
    while (options.length < 3) {
        let randomLetter = getRandomLetter();
        if (!options.includes(randomLetter)) {
            options.push(randomLetter);
        }
    }

    // Shuffle the options
    options = shuffleArray(options);

    // Display the options as buttons
    let optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = ''; // Clear any previous options

    options.forEach(letter => {
        let button = document.createElement('button');
        button.innerHTML = letter;
        button.onclick = function() { checkAnswer(letter); };
        optionsContainer.appendChild(button);
    });
}

// Function to shuffle an array (used for randomizing the options)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Function to check the user's answer
function checkAnswer(selectedLetter) {
    let resultElement = document.getElementById('result');
    
    if (selectedLetter === currentLetter) {
        // Correct answer
        score++;
        resultElement.innerHTML = `Correct! Score: ${score}`;
        resultElement.style.color = '#2ecc71'; // Green for correct answer
        resultElement.style.display = 'block';
        setTimeout(function() {
            resultElement.style.display = 'none';
            showRandomLetter(); // Show next letter immediately
        }, 5000);
    } else {
        // Wrong answer
        resultElement.innerHTML = `Nice try! Score: ${score}`;
        resultElement.style.color = '#e74c3c'; // Red for wrong answer
        resultElement.style.display = 'block';
        setTimeout(function() {
            resultElement.innerHTML += ' <button onclick="restart()">Try again</button>';
        }, 2000);
    }
}

// Function to restart the game
function restart() {
    score = 0;
    document.getElementById('result').style.display = 'none';
    document.getElementById('readyButton').style.display = 'block'; // Show the Ready button again
}
