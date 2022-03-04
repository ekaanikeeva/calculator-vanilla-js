const result = document.querySelector('.result_text');
const buttons = document.querySelector('.buttons');
const btn = document.querySelector('.btn');
const buttonAC = document.querySelector('.ac');
const form = document.querySelector('.form');

const numbersList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '%'];
const signsList = ['-', '+', 'X', '/'];

let sign = ''; 
let firstNum = ''; 
let secondNum = ''; 
let percentOfNum = null;

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
    if (firstNum.includes('%')) {
        return result.textContent = 0;
    }
    else if (secondNum.includes('%')) {
        if (sign === '+') {
            secondNum = secondNum.split('').filter(el => el !== '%').join('') * firstNum / 100;
        }
       else if (sign === 'X') {
            percentOfNum = secondNum.split('').filter(el => el !== '%').join('') * firstNum / 100;

        console.log(percentOfNum)
       }
    }
        switch (sign) {
            case "+":
                firstNum = (+firstNum) + (+secondNum);
                break;
            case "-":
                firstNum = firstNum - secondNum;
                break;
            case "X":
                if (percentOfNum !== null) firstNum = `${percentOfNum}`;
                else firstNum = firstNum * secondNum;
                break;
            case "/":
                if (secondNum === '0') {
                    result.textContent = 'Err';
                    firstNum = '';
                    secondNum = '';
                    sign = '';
                    return;
                }
                firstNum = firstNum / secondNum;
                break;
                // case "%":
                //     if (secondNum === '0') firstNum;
                //     else if (secondNum === '') {
                //         result.textContent = 'Err';
                //     firstNum = '';
                //     secondNum = '';
                //     sign = '';
                //     return;
                //     }
                //     else {
                //         secondNum = `${secondNum}%`;
                //         firstNum = firstNum + secondNum;
                //     }
                    // firstNum = firstNum * secondNum / 100;
        }
        finish = true;
        result.textContent = firstNum;

    

})

buttons.addEventListener('click', (event) => {

    if(!event.target.classList.contains('btn')) return;
    else if(event.target === buttonAC) clearResult();
    
    const pressedBtn = event.target.textContent;


    if (numbersList.includes(pressedBtn)) {
        
        if (secondNum ==='' && sign === '') {
            if (pressedBtn === '.' && firstNum.includes('.')) {
            firstNum += '';
            result.textContent = firstNum;
        } else {
            firstNum += pressedBtn;

            result.textContent = firstNum;
        }
        }
        else if (firstNum!=='' && secondNum!=='' && finish) {
            secondNum = pressedBtn;
            finish = false;
            result.textContent = secondNum;
        }
        // else 
        else {
            secondNum += pressedBtn;
            result.textContent = secondNum;
        }

        return;
    }

     // если нажата  + - / * 
     if (signsList.includes(pressedBtn)) {
        sign = pressedBtn;
        result.textContent = sign;

        return;
    }
});