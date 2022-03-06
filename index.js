const result = document.querySelector('.result_text');
const buttons = document.querySelector('.buttons');
const btn = document.querySelector('.btn');

const buttonCE = document.querySelector('.ce');
const buttonC = document.querySelector('.c');
const buttonMinusPlus = document.querySelector('.changeSign');
const buttonBackspace = document.querySelector('.backspace');
const buttonQuadrate = document.querySelector('.quadrate');
const buttonFraction = document.querySelector('.fraction');
const buttonRoot = document.querySelector('.root');


const form = document.querySelector('.form');

const numbersList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '%'];
const signsList = ['-', '+', '×', '/'];

let sign = ''; 
let firstNum = ''; 
let secondNum = ''; 
let percentOfNum = null;
let changedNum;
let finish  = false;
let whatIsNumber = null;

// очистить результат
function clearResult () {
    firstNum = ''; 
    secondNum = '';
    sign = ''; // знак
    finish = false;
    result.textContent = 0;
}

// очистить последнее число
function clearNum () {
    return result.textContent = 0;
}

function actualResult () {
    if (whatIsNumber === 'firstNum') {
        if (result.textContent == 0) return firstNum = '';
        else return firstNum = result.textContent;
    } 
    else if (whatIsNumber === 'secondNum') {
        if (result.textContent == 0) return secondNum = '';
        else return secondNum = result.textContent;
    }
}

function changeNumberSign (number) {
    if (number > 0) return result.textContent = `-${number}`;
    else {
        let positiveNumber = number.split('');
        positiveNumber.shift();
        return result.textContent = positiveNumber.join('');
    } 
}

function backspace (number) {
    if (result.textContent === 0) return;
    else {
        let reduceValue = result.textContent.split('');
        reduceValue.pop();
        if (number.length === 1 || number.length === 0) {
            return result.textContent = 0;
        }
        else return result.textContent = reduceValue.join('');
    }
}

function quadrateNumber (number) {

    result.textContent = number * number;
    
}

function fractionNumber (number) {
    result.textContent = 1 / number;
}

function sqrtNumber (number) {
    // console.log(Math.sqrt(number))
    result.textContent = Math.sqrt(number);
}

buttonC.addEventListener('click', clearResult);

buttonCE.addEventListener('click', () => {
    clearNum();
    if (whatIsNumber === 'firstNum') return firstNum = '';
    else if (whatIsNumber === 'secondNum') return secondNum = '';
})

buttonMinusPlus.addEventListener('click', () => {
    if (whatIsNumber === 'firstNum') changeNumberSign(firstNum);
    else if (whatIsNumber === 'secondNum') changeNumberSign(secondNum);
    return actualResult();
})

buttonQuadrate.addEventListener('click', () => {
    if (whatIsNumber === 'firstNum') quadrateNumber(firstNum);
    else if (whatIsNumber === 'secondNum') quadrateNumber(secondNum);
    return actualResult();
    
})

buttonBackspace.addEventListener('click', () => {
    if (whatIsNumber === 'firstNum') backspace(firstNum);
    else if (whatIsNumber === 'secondNum') backspace(secondNum);
    return actualResult();
    // else if (result.textContent === 0 && whatIsNumber === 'firstNum') return firstNum = '';
    // else if (result.textContent === 0 && whatIsNumber === 'secondNum') return secondNum = '';
})

buttons.addEventListener('click', (event) => {
    
    if(!event.target.classList.contains('btn')) return;
    // else if (event.target === buttonCE) clearNum();
    // else if (event.target === buttonC) clearResult();
    // else if (event.target === buttonMinusPlus ) changeNumberSign();
    // else if (event.target === buttonBackspace) backspace();
    // else if (event.target === buttonQuadrate) quadrateNumber()
    else if (event.target === buttonFraction) fractionNumber(firstNum);
    else if (event.target === buttonRoot) sqrtNumber(firstNum);
    
    const pressedBtn = event.target.textContent;

    if (numbersList.includes(pressedBtn)) {
        
        if (secondNum ==='' && sign === '') {
            if (pressedBtn === '.' && firstNum.includes('.')) {
            firstNum += '';
            result.textContent = firstNum;
        } else {
            firstNum += pressedBtn;
            whatIsNumber = 'firstNum';
            result.textContent = firstNum;
        }
        }
        else if (firstNum!=='' && secondNum!=='' && finish) {
            if (sign === '') {
                firstNum = pressedBtn;
                result.textContent = firstNum;
                whatIsNumber = 'firstNum';
            }
            else {
                secondNum += pressedBtn;
                console.log('n')
                result.textContent = secondNum;
                whatIsNumber = 'secondNum';
                finish = false;
            }

        }
        else {
            secondNum += pressedBtn;
            result.textContent = secondNum;
            whatIsNumber = whatIsNumber = 'secondNum';
        }
        console.log(firstNum, secondNum, sign, whatIsNumber)
        return;
    }

     // если нажат знак
     if (signsList.includes(pressedBtn)) {
        sign = pressedBtn;

        if (sign === '√ₓ') {
            switch(sign) {

                // case '¹⁄ₓ':
                //     firstNum = 1 / firstNum;
                //     break;
                case '√ₓ':
                    firstNum = Math.sqrt(firstNum);
                    break;
                

            }
            whatIsNumber = 'firstNum';
            result.textContent = firstNum;
                    
            finish = true;
            sign = ''
            
        }
        
        else 
        result.textContent = sign;
        finish = true;
        // sign = '';
        return;
        
    }

    console.log(firstNum, secondNum, sign, whatIsNumber)
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
        whatIsNumber = 'firstNum';
        console.log(firstNum, secondNum, sign, whatIsNumber)
})

