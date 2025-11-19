// Run pageLoaded() once the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    pageLoaded();
});

// Global variables
let txt1;
let txt2;
let btn;
let lblRes;
let operationSelect;

// Initialize elements and events
function pageLoaded() {

    txt1 = document.getElementById('txt1');  // Input 1 element
    txt2 = document.getElementById('txt2');  // Input 2 element
    btn = document.getElementById('btnCalc'); // "=" button
    lblRes = document.getElementById('lblRes'); // Result display
    operationSelect = document.getElementById('operation'); // SECTION 1: Dropdown

    // When "=" is pressed → run Calculate()
    btn.addEventListener('click', () => {
        Calculate();
    });

    // Demo button from existing setup
    const btn2 = document.getElementById("btn2");
    btn2.addEventListener("click", () => {
        print("btn2 clicked: " + btn2.id);
    });
}

// SECTION 1 + 2: Main calculator function
function Calculate() {

    txt1.classList.remove("is-valid", "is-invalid"); // Clear validation styles
    txt2.classList.remove("is-valid", "is-invalid");

    let num1 = parseFloat(txt1.value); // Convert text to number
    let num2 = parseFloat(txt2.value);
    let valid = true; // Tracks if input is valid

    // Validate number 1
    if (isNaN(num1)) {
        txt1.classList.add("is-invalid"); // Mark as invalid
        valid = false;
    } else {
        txt1.classList.add("is-valid"); // Mark as valid
    }

    // Validate number 2
    if (isNaN(num2)) {
        txt2.classList.add("is-invalid");
        valid = false;
    } else {
        txt2.classList.add("is-valid");
    }

    // If invalid → stop and log error
    if (!valid) {
        lblRes.innerText = "Invalid Input"; // Show error
        print("Error: One of the inputs is not a number"); // Log error
        return false; // Return boolean (SECTION 2)
    }

    // SECTION 1: Get operator from dropdown
    const op = operationSelect.value;
    let res;

    // Perform the selected operation
    switch (op) {
        case "+":
            res = num1 + num2; // Addition
            break;
        case "-":
            res = num1 - num2; // Subtraction
            break;
        case "*":
            res = num1 * num2; // Multiplication
            break;
        case "/":
            if (num2 === 0) { // Division by zero check
                lblRes.innerText = "Cannot divide by 0";
                print("Error: Attempt to divide by zero"); // Log error
                return false;
            }
            res = num1 / num2;
    }

    lblRes.innerText = res; // Show result

    // SECTION 2: Log operation into textarea
    print(num1 + " " + op + " " + num2 + " = " + res);

    return true; // Successful calculation
}

// SECTION 2: print() adds a new line and returns true/false
function print(msg) {

    const ta = document.getElementById("output"); // Log textarea

    if (!ta) return false; // If textarea missing → fail

    if (ta.value.length > 0)
        ta.value += "\n"; // Add new line before new message

    ta.value += msg; // Append text

    return true; // Successfully wrote to log
}

// Simple debug function
function demoNative() {
    print("Demo Native Types Activated.");
}

