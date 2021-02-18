//Variables
let userInputArray = [];

//Add user input to array method 
const AddInputToArray = (userInput) => {
    userInputArray.push(userInput);

    return;
}

const RandomWinner = () => {
    //Local variables
    let loopFlag = false;
    let maxDim = userInputArray.length;
    let index = 0;

    //DOM Elements
    let p = document.getElementById("output");

    while(!loopFlag) {
        index = Math.floor(Math.random() * Math.floor(maxDim));

        if(index > (userInputArray.length) - 1) {
            loopFlag = false;
        }
        else {
            loopFlag = true;
        }
    }

    return index;
}

//DOM Elements
let submitBtn = document.getElementById("submit-btn");
let generateBtn = document.getElementById("generate-btn");

//Event listeners
//Submit button event
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();

    //DOM Elements
    let p = document.getElementById("output");
    
    //Fetch user data from input field
    let userInput = document.getElementById("user-input").value;

    //Assert input 
    if(userInput === " " || userInput === "") {
        p.innerText = "";
        p.innerText += "You must provide an input";

        return;
    }
    else {
        p.innerText = "";

        AddInputToArray(userInput);

        return;
    }
});

//Generate button event
generateBtn.addEventListener('click', (event) => {
    event.preventDefault();

    //Variables
    let index = RandomWinner();

    //DOM Elements
    let p = document.getElementById("output");

    p.innerText = "";
    p.innerText += `The winner is ${userInputArray[index]}`; 

    return;
});