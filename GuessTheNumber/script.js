//Variables
let numberOfGuesses = 0;

//DOM elements
let guessBtn = document.getElementById("guess_btn");
let p = document.getElementById("game_output");

//Generate magic number
let magicNumber = MagicNumberGenerator();

//Add event listeners
guessBtn.addEventListener('click', (event) => {
    event.preventDefault();

    //User's guessed number
    let userGuess = parseInt(document.getElementById("user_form").elements.namedItem("user_input").value);
    numberOfGuesses++;

    Guess(userGuess, magicNumber, numberOfGuesses);
});


//Magic number generator method
function MagicNumberGenerator() {
    return Math.ceil(Math.random() * 10);
}

//Guessing process method
function Guess(userGuess, magicNumber, numberOfGuesses) {
    if(userGuess === magicNumber) {
        p.innerText = "";
        p.innerText += `The magic number is: ${magicNumber}\n`;
        p.innerText += `Number of guesses: ${numberOfGuesses}\n`;
        p.innerText += `Well done - Correct guess!\n`;
        
        return;
    }

    if(userGuess > magicNumber) {
        p.innerText = "";
        p.innerText += `Sorry! Your guess is to big\n`;
        
        return;
    }

    if(userGuess < magicNumber) {
        p.innerText = "";
        p.innerText += `Sorry! Your guess is to low\n`;
        
        return;
    }
}