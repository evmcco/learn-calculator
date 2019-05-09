"use strict";

const input = document.getElementById('input'), // input/output button
    number = document.querySelectorAll('.numbers div'), // number buttons
    operator = document.querySelectorAll('.operators div'), // operator buttons
    result = document.getElementById('result'), // equal button
    clear = document.getElementById('clear'); // clear button
    
let resultDisplayed = false; // flag to keep an eye on what output is displayed
const operatorChars = "+-*/";

// adding click handlers to number buttons
number.forEach(function(numbObj){
    numbObj.addEventListener('click',function(){
        if (resultDisplayed === false){
            input.innerHTML += this.innerHTML;}
        else if (resultDisplayed === true && (operatorChars.includes(input.innerHTML[input.innerHTML.length-1]))) {
            resultDisplayed = false;
            input.innerHTML += this.innerHTML;
            }
        else {
            resultDisplayed = false;
            input.innerHTML = '';
            input.innerHTML += this.innerHTML;
            };
        });
});
// adding click handlers to the operation buttons
operator.forEach(function(operObj){
    operObj.addEventListener('click',function(){
        if (input.innerHTML.length !== 0) {
            if (operatorChars.includes(input.innerHTML[input.innerHTML.length-1])){
                let newString = input.innerHTML.substring(0, input.innerHTML.length -1);
                newString += this.innerHTML;
                input.innerHTML = newString;
            }
            else {input.innerHTML += this.innerHTML;}
        }})
});

// on click of 'equal' button
result.addEventListener('click', function(){
    let currentString = input.innerHTML;
    // something like 1+4-3/4*4
    //remove trailing operator if one exists

    if ((operatorChars.includes(currentString[currentString.length-1]))) {
        currentString = currentString.substring(0,(currentString.length)-1);
    }

    const numberStringArray = currentString.split(/\+|\-|\*|\//g);
    // create array of just the numbers
    let numbersArray = [];
    numberStringArray.forEach(function(number){
        numbersArray.push(Number(number));
    })
    const operatorArray = currentString.replace(/[0-9]|\./g, "").split("");
    // 4 while loops for each operations M>D>A>S

    let multiply = operatorArray.indexOf("*");
    while (multiply != -1) {
        numbersArray.splice(multiply, 2, (numbersArray[multiply] * numbersArray[multiply+1]));
        operatorArray.splice(multiply,1);
        multiply = operatorArray.indexOf("*");
    }

    let divide = operatorArray.indexOf("/");
    while (divide != -1) {
        numbersArray.splice(divide, 2, (numbersArray[divide] / numbersArray[divide+1]));
        operatorArray.splice(divide,1);
        divide = operatorArray.indexOf("/");
    }

    let add = operatorArray.indexOf("+");
    while (add != -1) {
        numbersArray.splice(add, 2, (numbersArray[add] + numbersArray[add+1]));
        operatorArray.splice(add,1);
        add = operatorArray.indexOf("+");
    }

    let subtract = operatorArray.indexOf("-");
    while (subtract != -1) {
        numbersArray.splice(subtract, 2, (numbersArray[subtract] - numbersArray[subtract+1]));
        operatorArray.splice(subtract,1);
        subtract = operatorArray.indexOf("-");
    }
    numbersArray[0] = Math.round(numbersArray[0] * 100) / 100;
    input.innerHTML = numbersArray[0];
    resultDisplayed = true;
});




// clearing the input on press of clear
clear.addEventListener('click', function(){
    input.innerHTML = '';
    resultDisplayed = false;
});