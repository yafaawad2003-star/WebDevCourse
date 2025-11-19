// Run when page is loaded
document.addEventListener("DOMContentLoaded", () => {
    pageLoaded();
});

// Global variables
let txt1, txt2, lblRes, operationSelect, btnSizeDebug;
let lastBreakpoint = ""; // remember last size category (XS / SM / MD / LG / XL)

function pageLoaded() {

    // Get calculator elements
    txt1 = document.getElementById("txt1");        // first input
    txt2 = document.getElementById("txt2");        // second input
    lblRes = document.getElementById("lblRes");    // result label
    operationSelect = document.getElementById("operation"); // operation dropdown

    // "=" button click
    document.getElementById("btnCalc").addEventListener("click", Calculate);

    // btn2 click
    document.getElementById("btn2").addEventListener("click", () => {
        print("btn2 clicked");
    });

    // Size debug button
    btnSizeDebug = document.getElementById("btnSizeDebug");
    btnSizeDebug.addEventListener("click", logCurrentSizeDebug);

    // Log size on load
    logCurrentSizeDebug();

    // Log size when window is resized
    window.addEventListener("resize", logCurrentSizeDebug);
}

// Calculator logic
function Calculate() {

    // Remove old validation classes
    txt1.classList.remove("is-valid", "is-invalid");
    txt2.classList.remove("is-valid", "is-invalid");

    // Parse numbers from text
    let num1 = parseFloat(txt1.value);
    let num2 = parseFloat(txt2.value);

    let valid = true; // assume inputs are valid at start

    // Validate first number
    if (isNaN(num1)) {
        txt1.classList.add("is-invalid");
        valid = false;
    } else {
        txt1.classList.add("is-valid");
    }

    // Validate second number
    if (isNaN(num2)) {
        txt2.classList.add("is-invalid");
        valid = false;
    } else {
        txt2.classList.add("is-valid");
    }

    // If any input is invalid, show error and stop
    if (!valid) {
        lblRes.innerText = "Invalid Input";
        print("Error: invalid input");
        return;
    }

    // Read selected operation
    let op = operationSelect.value;
    let res;

    // Calculate based on operation
    switch (op) {
        case "+":
            res = num1 + num2;
            break;
        case "-":
            res = num1 - num2;
            break;
        case "*":
            res = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                lblRes.innerText = "Error";
                print("Error: divide by zero");
                return;
            }
            res = num1 / num2;
            break;
        default:
            res = NaN;
    }

    // Show result on screen
    lblRes.innerText = res;

    // Log full operation to log textarea
    print(`${num1} ${op} ${num2} = ${res}`);
}

// Log function – append text to textarea
function print(msg) {
    const ta = document.getElementById("output"); // log textarea
    if (!ta) return;

    if (ta.value.length > 0) {
        ta.value += "\n"; // new line between messages
    }

    ta.value += msg;
}

// Detect breakpoint (XS/SM/MD/LG/XL) and log only when it changes
function logCurrentSizeDebug() {

    const width = window.innerWidth; // current window width
    let breakpoint = "";
    let image = "";

    // Decide breakpoint and image name by width
    if (width < 576) {
        breakpoint = "XS";
        image = "xs.png";
    } else if (width < 768) {
        breakpoint = "SM";
        image = "sm.png";
    } else if (width < 992) {
        breakpoint = "MD";
        image = "md.png";
    } else if (width < 1200) {
        breakpoint = "LG";
        image = "lg.png";
    } else {
        breakpoint = "XL";
        image = "xl.png";
    }

    // If same breakpoint as before → do nothing (avoid spam in log)
    if (breakpoint === lastBreakpoint) {
        return;
    }

    // Update last breakpoint
    lastBreakpoint = breakpoint;

    // Write debug line
    print(`DEBUG: width=${width}px, breakpoint=${breakpoint}, image=${image}`);
}

// Simple demo function for "Native Types" button
function demoNative() {
    print("Native Types Demo Activated");
}
