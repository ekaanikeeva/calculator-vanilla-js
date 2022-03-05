const result = document.querySelector('.result_text');
const buttons = document.querySelector('.buttons');
const btn = document.querySelector('.btn');
const buttonAC = document.querySelector('.ac');
const form = document.querySelector('.form');

const numbersList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '%'];
const signsList = ['-', '+', '×', '/', '⌫', 'x²', '¹⁄ₓ', '√ₓ'];

let sign = ''; 
let firstNum = ''; 
let secondNum = ''; 
let percentOfNum = null;

let finish  = false;
let isAnsver = false;
// очистить результат
function clearResult () {
    firstNum = ''; 
    secondNum = '';
    sign = ''; // знак
    finish = false;
    result.textContent = 0;
}



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
            if (sign === '') {
                console.log(sign, 'pusto')
                firstNum = pressedBtn;
                result.textContent = firstNum;
            }
            else {secondNum =pressedBtn;
                console.log('net')
                result.textContent = secondNum;
                finish = false;}

console.log(finish)
        }
        // else if (firstNum!=='' && secondNum!=='' && !finish) {
        //     console.log('ne finish')
        //     secondNum=''
        //     firstNum=pressedBtn;
        //     result.textContent = firstNum;
        // }
        else {
            secondNum += pressedBtn;
            result.textContent = secondNum;
        }
        console.log(firstNum, secondNum, sign)
        return;
    }

     // если нажат знак
     if (signsList.includes(pressedBtn)) {
        sign = pressedBtn;

        if (sign === 'x²' || sign === '¹⁄ₓ' || sign === '√ₓ' || sign === '⌫') {
            switch(sign) {
                case 'x²':
                    firstNum = firstNum * firstNum;
                    break;
                case '¹⁄ₓ':
                    firstNum = 1 / firstNum;
                    break;
                case '√ₓ':
                    firstNum = Math.sqrt(firstNum);
                    break;
                case '⌫':
                    let backArray = [];
                    if (firstNum.length !== 1 && firstNum.length !== 0 && firstNum.length !== undefined) {
                    backArray= firstNum.split('');
                    backArray.pop();
                    firstNum = backArray.join('');
                    } else firstNum = 0;
                    break;
            }
            finish = true;
            // sign = ''
            // secondNum=''
            result.textContent = firstNum;
        }
        
        else result.textContent = sign;
        finish = true;
        return;
    }
    console.log(firstNum, secondNum, sign)
});

form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (secondNum ==='') secondNum = firstNum;
    // if (firstNum.includes('%')) {
    //     return result.textContent = 0;
    // }
    // else 

    if (secondNum.includes('%')) {
        if (sign === '+') {
            secondNum = secondNum.split('').filter(el => el !== '%').join('') * firstNum / 100;
        }
       else if (sign === '×') {
            percentOfNum = secondNum.split('').filter(el => el !== '%').join('') * firstNum / 100;

       }
    }
        switch (sign) {
            case '+':
                firstNum = (+firstNum) + (+secondNum);
                break;
            case '-':
                firstNum = firstNum - secondNum;
                break;
            case '×':
                if (percentOfNum !== null) firstNum = `${percentOfNum}`;
                else firstNum = firstNum * secondNum;
                break;
            case '/':
                if (secondNum === '0') {
                    result.textContent = 'Err';
                    firstNum = '';
                    secondNum = '';
                    sign = '';
                    return;
                }
                firstNum = firstNum / secondNum;
                break;
        }
        finish = true;
        isSubmit = true;
        sign=''
        result.textContent = firstNum;

    
console.log(firstNum, secondNum, sign)
})

