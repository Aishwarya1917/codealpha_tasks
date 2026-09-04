let currentNumber = "";
let previousNumber = "";
let operator = "";

const currentDisplay = document.getElementById("current-display");
const previousDisplay = document.getElementById("previous-display");


function appendNumber(number) {

    // Start fresh if the display shows Error
    if (currentNumber === "Error") {
        currentNumber = "";
        previousNumber = "";
        operator = "";
    }

    // Prevent multiple decimal points
    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    // Prevent unnecessary leading zeros
    if (currentNumber === "0" && number !== ".") {
        currentNumber = "";
    }

    currentNumber += number;

    updateDisplay();
}

// Choose operator
function chooseOperator(selectedOperator) {

    if (currentNumber === "" && previousNumber === "") {
        return;
    }

    if (currentNumber !== "" && previousNumber !== "") {
        calculate();
    }

    operator = selectedOperator;

    previousNumber = currentNumber;

    currentNumber = "";

    updateDisplay();
}


// Calculate result
function calculate() {

    if (!previousNumber || !operator || !currentNumber) {
        return;
    }

    const previous = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    let result;

    switch (operator) {

        case "+":
            result = previous + current;
            break;

        case "-":
            result = previous - current;
            break;

        case "*":
            result = previous * current;
            break;

        case "/":
            if (current === 0) {
                currentNumber = "Error";
                updateDisplay();
                return;
            }

            result = previous / current;
            break;

        case "%":
            result = previous * (current / 100);
            break;

        default:
            return;
    }

    // Keep the expression visible
    previousDisplay.textContent =
        `${previousNumber} ${displayOperator(operator)} ${currentNumber}`;

    // Show result
    currentNumber = String(result);

    // Clear calculation state
    previousNumber = "";
    operator = "";

    currentDisplay.textContent = currentNumber;
}


// Clear calculator
function clearDisplay() {

    currentNumber = "";

    previousNumber = "";

    operator = "";

    updateDisplay();
}


// Delete last number
function deleteNumber() {

    if (currentNumber === "Error") {
        currentNumber = "";
        previousNumber = "";
        operator = "";
        updateDisplay();
        return;
    }

    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();
}


// Update display
function updateDisplay() {

    // Show current number/result
    currentDisplay.textContent = currentNumber || "0";

    // Show complete expression while calculating
    if (previousNumber && operator) {
        previousDisplay.textContent =
            `${previousNumber} ${displayOperator(operator)} ${currentNumber}`;
    } else {
        previousDisplay.textContent = "";
    }
}

// Convert operators for display
function displayOperator(operator) {

    if (operator === "*") {
        return "×";
    }

    if (operator === "/") {
        return "÷";
    }

    if (operator === "-") {
        return "−";
    }

    return operator;
}


// Keyboard support
document.addEventListener("keydown", function(event) {

    const key = event.key;


    // Numbers
    if (!isNaN(key) || key === ".") {

        appendNumber(key);

        return;
    }


    // Operators
    if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%"
    ) {

        chooseOperator(key);

        return;
    }


    // Enter or =
    if (key === "Enter" || key === "=") {

        calculate();

        return;
    }


    // Backspace
    if (key === "Backspace") {

        deleteNumber();

        return;
    }


    // Escape
    if (key === "Escape") {

        clearDisplay();

        return;
    }

});