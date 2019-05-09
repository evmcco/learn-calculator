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
    console.log(this.innerHTML);
});
// clearing the input on press of clear
clear.addEventListener('click', function(){
    input.innerHTML = '';
});