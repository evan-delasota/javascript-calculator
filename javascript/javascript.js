const screen = document.querySelector(".screen");
let currentSymbol = 0;
let buffer = "0";
let previousOperator = null;


document.querySelector('.calc-buttons').addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
});

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    reRender();
}

function handleSymbol(value) {
    switch(value) {
        case "C":
            buffer = 0;
            currentSymbol = 0;
            break;

        case "=":
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = "" + currentSymbol;
            currentSymbol = 0;
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default:
            handleMath(value);
            break;

    }
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}

function reRender() {
    screen.innerText = buffer;
}

function flushOperation(intBuffer) {
    if (previousOperator === "+") {
        currentSymbol += intBuffer;
    } else if (previousOperator === "-") {
        currentSymbol -= intBuffer;
    } else if (previousOperator === "x") {
        currentSymbol *= intBuffer;
    } else {
        currentSymbol /= intBuffer;
    }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (currentSymbol === 0) {
        currentSymbol = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = value;
    buffer = "0";
}

