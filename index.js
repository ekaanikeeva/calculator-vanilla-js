const result = document.querySelector('.result_text');
const buttons = document.querySelector('.buttons');
const btn = document.querySelector('.btn');
const buttonCE = document.querySelector('.ce');
const buttonC = document.querySelector('.c')
const form = document.querySelector('.form');

const numbersList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '%', '+/-'];
const signsList = ['-', '+', '×', '/', '⌫', 'x²', '¹⁄ₓ', '√ₓ'];

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

function clearNum () {
    if (firstNum !== '' && secondNum === '') {
        firstNum = ''; 
        
    }
    else secondNum = '';

    result.textContent = 0;
}



buttons.addEventListener('click', (event) => {
    
    if(!event.target.classList.contains('btn')) return;
    else if(event.target === buttonCE) clearNum();
    else if (event.target === buttonC) clearResult();

    
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
            else {
                secondNum += pressedBtn;
                console.log('n')
                result.textContent = secondNum;
                finish = false;
            }

        }
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
                    console.log(firstNum.length)
                    backArray = result.textContent.split('');
                    backArray.pop();
                    if (result.textContent === firstNum) {
                        if (firstNum.length === 1) {
                            firstNum = '';
                            result.textContent = 0;
                        }
                        else {
                        firstNum = backArray.join('');
                        result.textContent = firstNum;
                    }
                    }
                    else { 
                        if (secondNum.length === 1) {
                            secondNum = ''
                            result.textContent = 0;
                        } 
                        else {
                        secondNum = backArray.join('');
                        result.textContent = secondNum;}
                    }
                    break;
            }
            if (sign !== '⌫') result.textContent = firstNum;
                    
            finish = true;
            sign = ''
            
        }
        
        else result.textContent = sign;
        finish = true;
        // sign = '';
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
    else if (secondNum.includes('%')) {
        if (sign === '+') {
            secondNum = secondNum.split('').filter(el => el !== '%').join('') * firstNum / 100;
        }
       else if (sign === '×') {
            percentOfNum = secondNum.split('').filter(el => el !== '%').join('') * firstNum / 100;
console.log(percentOfNum)
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
        sign='';
        secondNum='';
        result.textContent = firstNum;
        console.log(firstNum, secondNum, sign)
})

