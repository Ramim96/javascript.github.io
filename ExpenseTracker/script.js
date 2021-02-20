//Global initial budget
let initialBudget = 2000.00;

//Set initial budget 
const setBudget = () => {
    //DOM element
    let budget = document.getElementById("budget");
    budget.innerText = initialBudget.toString();

    return;
}

//Update initial budget
const updateBudget = () => {
    //DOM element
    let budget = document.getElementById("budget");

    //Get initial budget
    let estimatedBudget = 0;

    //Get report data
    let earning = +Math.abs(parseFloat(document.getElementById("earning").textContent));
    let expense = -Math.abs(parseFloat(document.getElementById("expense").textContent));

    //Estimate difference between earning and expenses
    estimatedBudget = earning + expense;
    
    budget.innerText = "";
    budget.innerText = initialBudget + estimatedBudget;

    return;
}

//Set report data 
const setReport = () => {
    //DOM element
    let earning = document.getElementById("earning");
    let expense = document.getElementById("expense");
    earning.innerText = 0;
    expense.innerText = 0;

    return;
}

//Update earning-expense report
const updateReport = (itemPrice, itemTransaction) => {
    //DOM element
    let earning = document.getElementById("earning");
    let expense = document.getElementById("expense");
    let earningValue = parseFloat(earning.innerText);
    let expenseValue = parseFloat(expense.innerText);
    
    //Assert item-transaction
    if(itemTransaction === "earning") {
        earningValue += itemPrice;
        earning.innerText = earningValue;
    }

    if(itemTransaction === "expense") {
        expenseValue += itemPrice;
        expense.innerText = expenseValue;
    }

    return;
}

//Create item element
const createItem = (itemName, itemPrice, itemTransaction, itemsList) => {
    //Create div element
    let div = document.createElement("div");
    div.id = itemName;
    div.classList.add("item");

    //Create p element
    let p = document.createElement("p");
    p.classList.add("item-name");
    p.innerText = itemName;

    //Create input element for item-price
    let inputPrice = document.createElement("input");
    inputPrice.hidden = true;
    inputPrice.setAttribute("name", "item-price");
    inputPrice.setAttribute("value", itemPrice);

    //Create input element for item-transaction
    let inputTransaction = document.createElement("input");
    inputTransaction.hidden = true;
    inputTransaction.setAttribute("name", "item-transaction");
    inputTransaction.setAttribute("value", itemTransaction);

    //Create i element for delete icon
    let icon = document.createElement("i");
    icon.id = "delete-btn";
    icon.classList.add("fas", "fa-times");
    icon.addEventListener("click", (event) => {
        //Prevent page reload
        event.preventDefault();
        
        let itemName = event.target.parentNode.id;

        window.localStorage.removeItem(itemName);

        //Update items-list container
        updateItemsList();  

        return;
    });

    div.appendChild(p);
    div.appendChild(inputPrice);
    div.appendChild(inputTransaction);
    div.appendChild(icon);

    itemsList.appendChild(div);

    return;
}

//Update items-list container
const updateItemsList = () => {
    //Assert local-storage length
    if(window.localStorage.length > 0) {
        //Set report data 
        setReport();

        //Storage keys and values
        let storageKeys = Object.keys(window.localStorage);
        let storageValues = Object.values(window.localStorage);

        //DOM element
        let itemsList = document.getElementById("items-list");
        itemsList.innerHTML = "";

        //Create and add item to items-list
        for(let i = 0; i < window.localStorage.length; i++) {
            let itemData = JSON.parse(storageValues[i]);
            
            //Item data
            let itemName = storageKeys[i];
            let itemPrice = parseFloat(itemData.price);
            let itemTransaction = itemData.transaction;

            //Create item element
            createItem(itemName, itemPrice, itemTransaction, itemsList);
            
            //Update earning-expense report
            updateReport(itemPrice, itemTransaction);
        }

        //Update initial budget
        updateBudget();

        return;
    }
    else {
        //Reset items-list container
        let itemsList = document.getElementById("items-list");
        itemsList.innerHTML = "";

        //Set initial budget 
        let budget = document.getElementById("budget");
        budget.innerText = initialBudget.toString();

        //Set report data 
        setReport();

        return;
    }
}

//Application entry point
window.onload = () => {
    //Set-up initial budget
    setBudget();

    //Update items-list container
    updateItemsList();

    //Handle item input process
    //DOM element
    let submitBtn = document.getElementById("submit-btn");
    submitBtn.addEventListener("click", (event) => {
        //Prevent page reload
        event.preventDefault();

        //Item object
        let itemData = new Object();

        //Validation errors counter
        let errorsCounter = 0;

        //Item input elements
        let inputItem = document.getElementById("item-name");
        let inputPrice = document.getElementById("item-price");
        
        //Remove error class
        inputItem.classList.remove("error");
        inputPrice.classList.remove("error");

        //Item input data
        let itemName = inputItem.value;
        let itemPrice = inputPrice.value;
        let itemTransaction = document.getElementById("transaction-type").value;
 
        //Validate item-name and item-price
        if(itemName === "" || itemName === null) {
            //Add error class and provide message
            inputItem.classList.add("error");

            errorsCounter += 1;
        }
        
        if(itemPrice === "" || itemPrice === null) {
            //Add error class and provide message
            inputPrice.classList.add("error");

            errorsCounter += 1;
        }

        //Check validation errors
        if(errorsCounter == 0) {
            //Add field members to item object
            itemData.price = parseFloat(itemPrice);
            itemData.transaction = itemTransaction;

            //Item name first letter to uppercase
            itemName = itemName.charAt(0).toUpperCase() + itemName.slice(1);

            //Parse data
            itemData = JSON.stringify(itemData);

            //Add items to local-storage
            window.localStorage.setItem(itemName, itemData);

            //Update items-list container
            updateItemsList();

            //Reset input fields
            inputItem.value = "";
            inputPrice.value = "";

            return;
        }
        else {
            return;
        }
    });

    //Handle item deletion process
    //DOM element
    // let deleteBtn = document.querySelectorAll("#delete-btn")
    // deleteBtn.forEach((btn) => {
    //     btn.addEventListener("click", (event) => {
    //         let itemName = event.target.parentNode.id;

    //         window.localStorage.removeItem(itemName);

    //         //Update items-list container
    //         updateItemsList();  

    //         return;
    //     });
    // });
    
}