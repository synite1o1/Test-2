const signDictionary = {
    "A": "Images/A.png",
    "B": "Images/B.png",
    "C": "Images/C.png",
    "D": "Images/D.png",
    "E": "Images/E.png",
    "F": "Images/F.png",
    "G": "Images/G.png",
    "H": "Images/H.png",
    "I": "Images/I.png",
    "J": "Images/J.png",
    "K": "Images/K.png",
    "L": "Images/L.png",
    "M": "Images/M.png",
    "N": "Images/N.png",
    "O": "Images/O.png",
    "P": "Images/P.png",
    "Q": "Images/Q.png",
    "R": "Images/R.png",
    "S": "Images/S.png",
    "T": "Images/T.png",
    "U": "Images/U.png",
    "V": "Images/V.png",
    "W": "Images/W.png",
    "X": "Images/X.png",
    "Y": "Images/Y.png",
    "Z": "Images/Z.png",
};

let currentAnswer = "";
let correctAnswers = 0;
let totalQuestions = 0;

let countdownElement = document.getElementById("countdown");
let questionElement = document.getElementById("question");
let signImage = document.getElementById("signImage");
let optionsContainer = document.getElementById("options");
let resultMessage = document.getElementById("resultMessage");
let finalScoreElement = document.getElementById("finalScore");

document.getElementById("readyButton").addEventListener("click", startCountdown);

function startCountdown() {
    document.getElementById("readyButton").disabled = true; // Disable button during countdown
    correctAnswers = 0;
    totalQuestions = 0;
    resultMessage.innerText = "";
    finalScoreElement.style.display = "none";
    
    let count = 3;
    countdownElement.innerText = `Starting in ${count}...`;

    let countdownInterval = setInterval(() => {
        count--;
        if (count >= 0) {
            countdownElement.innerText = `Starting in ${count}...`;
        }
        if (count < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerText = "";
            startQuiz();
        }
    }, 1000);
}

function startQuiz() {
    totalQuestions++;
    optionsContainer.innerHTML = "";

    // Pick a random letter
    let keys = Object.keys(signDictionary);
    currentAnswer = keys[Math.floor(Math.random() * keys.length)];

    // Display the letter in the question
    questionElement.innerText = `Which image corresponds to the letter: ${currentAnswer}`;
    signImage.style.display = "none"; // Hide the image

    // Get images for the current answer and two incorrect options
    let incorrectOptions = keys.filter(k => k !== currentAnswer);
    let randomIncorrects = incorrectOptions.sort(() => 0.5 - Math.random()).slice(0, 2);

    // Add the correct image to the options and shuffle them
    let choices = [currentAnswer, ...randomIncorrects];
    choices.sort(() => Math.random() - 0.5);

    // Display images for the choices
    choices.forEach(choice => {
        let btn = document.createElement("button");
        let img = document.createElement("img");
        img.src = signDictionary[choice];
        img.alt = choice;
        img.style.width = "100px";  // Adjust size if needed
        img.style.height = "100px"; // Adjust size if needed
        
        // Add the letter to the button text (or below the image for clarity)
        let letterText = document.createElement("p");
        letterText.innerText = choice;
        btn.appendChild(img);
        btn.appendChild(letterText); // Append the letter under the image

        btn.onclick = () => checkAnswer(choice);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected) {
    if (selected === currentAnswer) {
        correctAnswers++;
        resultMessage.innerText = "Correct! Moving to next question...";
        resultMessage.style.color = "green";
        setTimeout(startQuiz, 1000);
    } else {
        endQuiz();
    }
}

function endQuiz() {
    questionElement.innerText = "Game Over!";
    optionsContainer.innerHTML = "";
    resultMessage.innerText = "";
    finalScoreElement.innerText = `Total Correct Answers: ${correctAnswers}`;
    finalScoreElement.style.display = "block";
    document.getElementById("readyButton").disabled = false; // Enable Ready button for restart
}
