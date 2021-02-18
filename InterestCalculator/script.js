//DOM elements
let processInterestBtn = document.getElementById("process_interest_btn");

//Event listeners
processInterestBtn.addEventListener('click', (event) => {
    event.preventDefault();

    //DOM elements
    let loanAmount = parseInt(document.getElementById("interest_form").elements.namedItem("loan_amount").value);
    let interestRate = parseInt(document.getElementById("interest_form").elements.namedItem("interest_rate").value);
    let p = document.getElementById("output");

    InterestProcessor(loanAmount, interestRate, p);
});

//Loan interest payment method
function InterestProcessor(loanAmount, interestRate, p) {
    //Annual rate
    let annualRate = ((interestRate / 100) / 12).toFixed(4);

    //Monthly interest rate 
    let monthlyRate = annualRate * 100;

    //Monthly payment
    let monthlyPayment = loanAmount * annualRate;

    p.innerText += `Your loan request is ${loanAmount}£ and the current interest rate is ${interestRate}%\n`;
    p.innerText += `The monthly interest payment is ${monthlyPayment}£\n`;
    p.innerText += `The monthly interest rate is ${monthlyRate}%`;
}