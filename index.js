const result = document.querySelector('.result_text');
const buttons = document.querySelector('.buttons');
const btn = document.querySelector('.btn');
const buttonAC = document.querySelector('.ac');
const form = document.querySelector('.form');

const numbersList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const signsList = ['-', '+', 'X', '/'];

let sign = ''; 
let firstNum = ''; 
let secondNum = ''; 

let finish  = false;

// очистить результат
function clearResult () {
    firstNum = ''; 
    secondNum = '';
    sign = ''; // знак
    finish = false;
    result.textContent = 0;
}


form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (secondNum ==='') secondNum = firstNum;
        switch (sign) {
            case "+":
                firstNum = (+firstNum) + (+secondNum);
                break;
            case "-":
                firstNum = firstNum - secondNum;
                break;
            case "X":
                firstNum = firstNum * secondNum;
                break;
            case "/":
                if (secondNum === '0') {
                    result.textContent = 'Error';
                    firstNum = '';
                    secondNum = '';
                    sign = '';
                    return;
                }
                firstNum = firstNum / secondNum;
                break;
        }
        finish = true;
        result.textContent = firstNum;
        console.table(firstNum, secondNum , sign);
    

})

buttons.addEventListener('click', (event) => {

    if(!event.target.classList.contains('btn')) return;
    else if(event.target === buttonAC) clearResult();
    
    const pressedBtn = event.target.textContent;

    // если нажата клавиша 0-9 или ,
    if (numbersList.includes(pressedBtn)) {
        // if (pressedBtn === '.' && firstNum.includes('.')) {
        //     firstNum += '';
        //     result.textContent = firstNum;
        // } else {
        //     firstNum += pressedBtn;

        //     result.textContent = firstNum;
        // }
        if (secondNum ==='' && sign === '') {
                    if (pressedBtn === '.' && firstNum.includes('.')) {
            firstNum += '';
            result.textContent = firstNum;
        } else {
            firstNum += pressedBtn;

            result.textContent = firstNum;
        }
            // firstNum += pressedBtn;
            
            // result.textContent = firstNum;
        }
        else if (firstNum!=='' && secondNum!=='' && finish) {
            secondNum = pressedBtn;
            finish = false;
            result.textContent = secondNum;
        }
        else {
            secondNum += pressedBtn;
            result.textContent = secondNum;
        }
        console.table(firstNum, secondNum , sign);
        return;
    }

     // если нажата  + - / *
     if (signsList.includes(pressedBtn)) {
        sign = pressedBtn;
        result.textContent = sign;
        console.table(firstNum, secondNum , sign);
        return;
    }

    // нажата =
    // if (pressedBtn === '=') {
    //     if (secondNum ==='') secondNum = firstNum;
    //     switch (sign) {
    //         case "+":
    //             firstNum = (+firstNum) + (+secondNum);
    //             break;
    //         case "-":
    //             firstNum = firstNum - secondNum;
    //             break;
    //         case "X":
    //             firstNum = firstNum * secondNum;
    //             break;
    //         case "/":
    //             if (secondNum === '0') {
    //                 result.textContent = 'Ошибка';
    //                 firstNum = '';
    //                 secondNum = '';
    //                 sign = '';
    //                 return;
    //             }
    //             firstNum = firstNum / secondNum;
    //             break;
    //     }
    //     finish = true;
    //     result.textContent = firstNum;
    //     console.table(firstNum, secondNum , sign);
    // }

});