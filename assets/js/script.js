// Wait for the DOM to finish loading before running the script
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") == "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }

        })
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition")
})
// Get the button elements and add eventlisteners to them

function runGame(gameType) {
    answerBox = document.getElementById("answer-box")
    answerBox.value = "";
    answerBox.focus();
    //generate two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;
    
    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "subtraction") {
        displaySubtractionQuestion(num1, num2);
    } else if (gameType === "multiplication") {
        displayMultiplicationQuestion(num1, num2);
    } else if (gameType === "division") {
        num1 = Math.floor(Math.random() * 100) + 1;
        num2 = Math.floor(Math.random() * 100) + 1;
        displayDivisionQuestion(num1, num2)
    }
    
    else {
        alert(`Unknown game type ${gameType}`);
        throw `Unknown game type ${gameType}, aborting!`;
    }
}

function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let correctAnswer = calculateCorrectAnswer()[0];
    if (userAnswer === correctAnswer) {
        alert("Well done, you got it!")
        incrementScore();
    } else {
        alert(`Oops, your answer was ${userAnswer} but the correct answer is ${correctAnswer}!`)
        incrementWrongAnswer();
    }
    runGame(calculateCorrectAnswer()[1])
}

function calculateCorrectAnswer() {
    // gets the operands and operator directly from the DOM
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;
    if (operator === "+") {
        return [operand1 + operand2, "addition"]
    } else if (operator === "-") {
        return [operand1 - operand2, "subtraction"]
    } else if (operator === "x") {
        return [operand1 * operand2, "multiplication"]
    } else if (operator === "/") {
        return [operand1 / operand2, "division"]
    } else {
        alert(`Unimplemented operator ${operator}`)
    }
}

function incrementScore() {
    scoreSpan = document.getElementById("score");
    oldScore = parseInt(scoreSpan.innerText);
    scoreSpan.textContent = ++oldScore;
}

function incrementWrongAnswer() {
    scoreSpan = document.getElementById("incorrect");
    oldScore = parseInt(scoreSpan.innerText);
    newScore = oldScore + 1;
    scoreSpan.textContent = newScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operator").textContent = "+";
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;

}

function displaySubtractionQuestion(operand1, operand2) {
    document.getElementById("operator").textContent = "-";
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1

}

function displayMultiplicationQuestion(operand1, operand2) {
    document.getElementById("operator").textContent = "x";
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById("operator").textContent = "/";
    largestOperand = operand1 > operand2 ? operand1 : operand2;
    smallestOperand = operand1 > operand2 ? operand2 : operand1;
    if (operand1 === operand2 || operand1 === 1 || operand2 === 1) {
        runGame("division");
    } else if (largestOperand % smallestOperand === 0) {
        document.getElementById("operand1").textContent = largestOperand;
        document.getElementById("operand2").textContent = smallestOperand;
    } else {
        runGame("division");
    }
}