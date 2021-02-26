//Array of words
let wordsArray = ["milk", "lawyer", "runner", "taxi", "tower", "shoes"];
let playerLife = 8;
let lettersSubmit = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "z"];

//Print win message
let printWinMsg = () => {
    let winMsg = document.getElementById("win-msg-container");
    winMsg.style.top = "50%";

    return;
}

//Print lost message
let printLostMsg = () => {
    let loseMsg = document.getElementById("lose-msg-container");
    loseMsg.style.top = "50%";

    return;
}

//Provide letters hint
let printLettersHint = () => {
    let lettersHint = document.getElementById("letters-array-container");
    lettersHint.style.top = "50%";

    return;
}

//Generate visual letter slots for the DOM
let generateSlots = (wordToGuess) => {
    let slotsArray = [];

    for(let i = 0; i < wordToGuess.length; i++) {
        slotsArray[i] = " _ ";
    }

    return slotsArray;
}

//Populate letters hint section with letters
let generateLettersHint = () => {
    let lettersHint = document.getElementById("letters-array-item");

    lettersSubmit.forEach(element => {
        let p = document.createElement("p");
        p.classList.add("letter");
        p.innerText = element;
        p.id = element;

        lettersHint.appendChild(p);
    });
}

//Hide letters hint
let hideLettersHint = () => {
    let lettersHint = document.getElementById("letters-array-container");
    lettersHint.style.top = "-50%";

    return;
}

//Update letters hint
let updateLettersHint = (letterId, isLetter) => {
    let letter = document.getElementById(letterId);

    if(isLetter) {
        letter.classList.add("letter-success");
    }
    else {
        letter.classList.add("letter-error");
    }
}

//Render/Update user life on the DOM
let printPlayerLife = (playerLife) => {
    let life = document.getElementById("life");
    life.innerText = playerLife;
}

//Render letter slots on the DOM
let printLetterSlots = (letterSlots) => {
    //Fetch the element and render the letter slots
    let outputString = document.getElementById("output-string");

    outputString.innerText = "";
    
    for(let i = 0; i < letterSlots.length; i++) {
        outputString.innerText += `${letterSlots[i]}`;
    }

    return;
}

//Update letter slots on the DOM
let updateSlots = (letterSlots, wordToGuess, userGuess) => {
    for(let i = 0; i < letterSlots.length; i++) {
        if(wordToGuess[i] === userGuess) {
            letterSlots[i] = " " + userGuess + " "; 
        }
    }

    printLetterSlots(letterSlots);
    
    return;
}

//Assert if all the letters have guessed sucessfully
let checkSlots = (letterSlots) => {
    let outcomeCheck = letterSlots.includes(" _ ");

    if(!outcomeCheck) {
        printWinMsg();
        
        return;
    }

    return 
}

//Validate user input letter
let validateInput = (userGuess) => {
    let msg = document.getElementById("msg");

    if(userGuess.length === 0) {
        msg.innerText = ""; 
        msg.innerText += "Provide an input!"; 

        return false;
    }

    if(userGuess.length > 1) {
        msg.innerText = ""; 
        msg.innerText += "Provide one character!";

        return false;
    }

    return true;
}

//Update user life
let updateLife = (playerLife) => {
    playerLife = playerLife - 1;
    printPlayerLife(playerLife); 
    
    return playerLife;
}

//Assert user input is part of the word to be guessed
let getWordIndex = (userGuess, wordToGuess) => {
    let inArray = wordToGuess.includes(userGuess);

    if(inArray) {
        let index = wordToGuess.indexOf(userGuess);

        return index;
    }
    else {
        return false;
    }
}

window.onload = (event) => {
    event.preventDefault();

    //Select a random word via the index randomly generated
    let wordIndex = Math.floor(Math.random() * wordsArray.length);
    
    let wordToGuess = wordsArray[wordIndex].split("");

    //Generate and print the letter slots to be rendered on the DOM
    let letterSlots = generateSlots(wordToGuess);
    //Generate letters hints
    generateLettersHint();

    printLetterSlots(letterSlots);
    printPlayerLife(playerLife); 

    //Validate the input and process the user letter guess
    let guessBtn = document.getElementById("guess-btn");
    guessBtn.addEventListener("click", (event) => {
        event.preventDefault();

        let userGuess = document.getElementById("user-input").value.trim().toLowerCase();
        document.getElementById("user-input").value = "";

        let msg = document.getElementById("msg");

        msg.innerText = ""; 

        //Validate user input
        let validationOutcome = validateInput(userGuess);

        if(validationOutcome) {
            if(wordToGuess.includes(userGuess)) {
                updateSlots(letterSlots, wordToGuess, userGuess);
                checkSlots(letterSlots);
                updateLettersHint(userGuess, true);
                
                return;
            }
            else {
                updateLettersHint(userGuess, false);
                playerLife = updateLife(playerLife);

                if(playerLife === 0) { 
                    printLostMsg();

                    return;
                }

                return;
            } 
        }
    });

    //Access the letters hint section
    let lettersBtn = document.getElementById("letters-array-btn");
    lettersBtn.addEventListener("click", (event) => {
        event.preventDefault();

        printLettersHint();
    });
}

//Detect the play button click event and change the header size
let playBtn = document.getElementById("game-title-header");
playBtn.addEventListener("click", (event) => {
    event.preventDefault();

    let headerSection = document.getElementById("game-title-header");
    let playBtn = document.getElementById("play-btn");

    headerSection.style.height = "20%"; 
    playBtn.style.display = "none";
});

//Reload web page
let restartWinBtn = document.getElementById("restart-win-btn");
restartWinBtn.addEventListener("click", (event) => {
    event.preventDefault();

    location.reload();
});

let restartLoseBtn = document.getElementById("restart-lose-btn");
restartLoseBtn.addEventListener("click", (event) => {
    event.preventDefault();

    location.reload();
});

//Close letters hint section
let closeBtn = document.getElementById("close-btn");
closeBtn.addEventListener("click", (event) => {
    event.preventDefault();

    hideLettersHint();
});