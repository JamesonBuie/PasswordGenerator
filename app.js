// PASSWORD GENERATOR

// Character Generator Functions

// Function that accepts a string value as an argument and return a random index number from the string argument
function randomIndex(str) {
    return Math.
        floor(Math.random() * str.length)
}

// Example of the randomIndex function
randomIndex(`Chicken`); // 0, 1, 2, 3, 4, 5, 6

// 
function getRandomLower() {
    const letters = `abcdefghijklmnopqrstuvwxyz`;
    // Returning a random letter using a random index in the letter string
    return letters[randomIndex(letters)];
}

// Example of the getRandomLower function
console.log(getRandomLower());// Random lowercase letter

// Function that returns a random uppercase letter
function getRandomUpper() {
    // Running the getRandomLower function to create a random lowercase letter and setting that value to the "letter" variable
    const letter = getRandomLower();
    //
    return letter.toUpperCase();
}
// Example of the getRandomUpper function
console.log(getRandomUpper());

// Function that returns a random index from the numbers string
function getRandomNumber(){
    const numbers = `1234567890`;
    // Returning a random number using a random index from the numbers string
    return numbers[randomIndex(numbers)];
}

console.log(getRandomNumber()); // Random number from the numbers string



// Function that returns a random index from the symbols string
function getRandomSymbol(){
    const symbols =`!@#$%^&*(){}[]=<>/,.`;
    // Returning a random symbol using a random index from the symbols string
    return symbols[randomIndex(symbols)];
}

console.log(getRandomSymbol()); // Random symbol from the symbols string

// Object to store all the character generator functions
const randomFunctions = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}; 

// Selecting the DOM elements
const resultEl = document.querySelector(`#result`);
const clipboardEl = document.querySelector(`#clipboard`);
const lowercaseEl = document.querySelector(`#lowercase`);
const uppercaseEl = document.querySelector(`#uppercase`);
const numbersEl = document.querySelector(`#numbers`);
const symbolsEl = document.querySelector(`#symbols`);
const lengthEl = document.querySelector(`#length`);
const generateEl = document.querySelector(`#generate`);

// Generated Password Function (Function that accepts true or false values as well as a number as arguments)
// The checkbox inputs and number input will determine the values/arguments entered into this function
function generatePassword (lower, upper, number, symbol, length){
    console.log(lower, upper, number, symbol, length);

    // 1. CREATE THE PASSWORD VARIABLE
    let generatedPassword = ``;

    // 2. FILTER OUT UNCHECKED OPTIONS
    // True and false values can be added together (True = 1, False = 0)
    // This value set to the typesCount variable will be used when building out the password
    const typesCount = lower + upper + number + symbol;
    console.log(typesCount);
    // If the user has NOT selected any of the four options, then the alert will be displayed and an empty string will be returned from the function so the password displayed to the use will be an empty string (Nothing will be displayed)
    if (typesCount === 0) {
        alert(`Please select at least one option`);
        // The return keyword stops the execution of a function 
        return ``;
    }

    // Creating an array of arrays. The first item in each nested array holds the value of a string tht will be used to access a function in the randomFunctions object. Also, the second items in each nested array are of the values passed into this generatePassword function
    let typesArr = [
        [`lower`, lower],
        [`upper`, upper],
        [`number`, number],
        [`symbol`, symbol]
    ];
    console.log(typesArr);

    // The filter method creates a new array with all the items that "pass the test" implemented by the provided function (All the items that cause the function to return a boolean value of true when the function is run using the item as the argument for the item parameter in this example)
    // Checking if the value for index of 1 in each item in the typesArr array is true or false. Also, removing the item from the typesArr if it is false. 
    typesArr = typesArr.filter(item=> {
        return item[1]
    });
    console.log(typesArr);




    // 3. LOOP OVER THE LENGTH AND CALL THE GENERATOR FUNCTION FOR EACH CHECKED OPTION
    // Building password with a for loop
    // The value for length is the value entered/selected for the length number input
    for (i=0; i<length; i+= typesCount){
        // One of items in the updated/filtered versions of the typesArr array will be the value/argument passed in for the types parameter each time the anonymous arrow function is run
        typesArr.forEach(type => {
            const funcName = type[0];
            console.log(funcName);
            // Accessing and running a function in the randomFunctions object. Also, concatenating the value returned from the accessed function to the generatedPassword string variable
            generatedPassword += randomFunctions[funcName]();
            console.log(generatedPassword);
        });
    }
    // 4. ADD THE GENERATED PASSWORD TO THE FINAL PASSWORD VARIABLE AND RETURN IT OUT OF THE FUNCTION
    // Removing extra characters if necessary
    const finalPassword = generatedPassword.slice(0, length);
    console.log(finalPassword);

    return finalPassword;


}
// Example of the generatedPassword function
// Using the starting values for when the page first loads
// generatePassword(true, true, true, true, 10);

// 
generateEl.addEventListener(`click`, ()=> {
    // Checking if the following options are selected and the true or false values to the respective variables
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    // Accessing the value for the number input and changing the value from a string to a number
    // THe value returned from a number input is a string value
    const length = parseInt(lengthEl.value);
    console.log(hasLower, hasUpper, hasNumber, hasSymbol);

    // The generated password function takes the true/false values determined by the checkboxes as well as the number from the number input as arguments and returns a string which is set as the innerText value for the "result" element
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);

});
// COPY PASSWORD
clipboardEl.addEventListener(`click`, ()=> {
    // Creating a textarea element which will be used to put the password inside of so that it can be copied
    const textarea = document.createElement(`textarea`);

    // Accessing the text/string value for the "Result" span and setting it to the password variable
    const password = resultEl.innerText;

    // If the user clicks the clipboard button while no password is displayed, then an alert will be displayed to the user and function will end and nothing will be copied to the clipboard.
    if (password === ``){
        alert(`Please generate a password first`);
        return;
    }

    // Setting the value for the textarea to the password that is currently being displayed
    textarea.value = password;
    // Selecting the body element
    const body = document.querySelector(`body`);
    // Adding the textarea to the webpage/document
    body.append(textarea);

    // Using the select method which selects an element. This will highlight/select the value inside the textarea
    textarea.select();

    // Referencing the "navigator" object to copy the selected value to the clipboard on the device the webpage is being viewed on
    navigator.clipboard.writeText(textarea.value);
    // Removes the text area from appearing on the page
    textarea.remove();

    

});