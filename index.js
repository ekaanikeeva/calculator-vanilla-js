
const result = document.querySelector('.result_text');
const buttons = document.querySelector('.buttons');
const btn = document.querySelector('.btn');

const buttonCE = document.querySelector('.ce');
const buttonC = document.querySelector('.c');
const buttonMinusPlus = document.querySelector('.changeSign');
const buttonBackspace = document.querySelector('.backspace');
const buttonQuadrate = document.querySelector('.quadrate');
const buttonFraction = document.querySelector('.fraction');
const buttonRoot = document.querySelector('.sqrt');
const buttonMS = document.querySelector('.ms');
const buttonPlusMS = document.querySelector('.plusMemory');
const buttonMinusMS = document.querySelector('.minusMemory');
const buttonMR = document.querySelector('.mr');
const buttonMC = document.querySelector('.mc');
const simpleSigns = document.querySelectorAll('.simpleSign');
const buttonPercent = document.querySelector('.percent');
const numbers = document.querySelectorAll('.num');
const form = document.querySelector('.form');
const openBracket = document.querySelector('.openBracket');
const closeBracket = document.querySelector('.closeBracket');

let sign = ''; 
let firstNum = ''; 
let secondNum = ''; 
let percentOfNum = null;
let finish  = false;
let isResult = false;
let whatIsNumber = null;
let memorySave = null;
let savedValue = null;
let savedSign = null;
let expression = '';

// очистить результат
function clearResult () {
    firstNum = ''; 
    secondNum = '';
    sign = ''; // знак
    finish = false;
    expression = '';
    result.textContent = 0;
}

// очистить последнее число
function clearNum () {
    return result.textContent = 0;
}

// + - * /
function calculate () {
    switch (sign) {
        case '+':
            isResult = true;
            sumNumbers();
            break;
        case '-':
            isResult = true;
            minusingNumbers();
            break;
        case '×':
            if (secondNum === '') return;
            firstNum = firstNum * secondNum;
            isResult = true;
            break;
        case '/':
            if (secondNum === '') return;
            if (secondNum === '0') {
                result.textContent = 'Err';
                firstNum = '';
                secondNum = '';
                sign = '';
                return;
            }
            firstNum = firstNum / secondNum;
            isResult = true;
            break;
    }
    finish = true;
    sign='';
    secondNum='';
    result.textContent = firstNum;
    whatIsNumber = 'firstNum';
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

function sumNumbers () {
    return firstNum = (+firstNum) + (+secondNum);
}

function minusingNumbers () {
    return firstNum = firstNum - secondNum;
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
    result.textContent = Math.sqrt(number);
}

function saveNumber () {
    buttonMR.disabled = false;
    buttonMC.disabled = false;
    return memorySave = result.textContent;
}

function plusSaveMemory () {
    if (memorySave === null) return saveNumber();
    else return memorySave = (+memorySave) + (+result.textContent);
}

function minussaveMemory () {
    return memorySave = memorySave - result.textContent;
}

function percent () {
    if (whatIsNumber === 'firstNum') return result.textContent = 0;
    else if (whatIsNumber === 'secondNum') {
        switch (sign) {
            case '+':
                secondNum = secondNum * firstNum / 100;
                result.textContent = secondNum;
                break;
            case '-':
                secondNum = firstNum - secondNum * firstNum / 100;
                result.textContent = secondNum;
                break;
            case '×':
                firstNum = secondNum * firstNum / 100;
                result.textContent = secondNum / 100;
                finish = true;
                sign='';
                secondNum='';
                whatIsNumber = 'firstNum';
                break;
            case '/':
                secondNum = secondNum / 100;
                result.textContent = secondNum;
                firstNum = firstNum / secondNum;
                finish = true;
                sign='';
                secondNum='';
                whatIsNumber = 'firstNum';
        }
    }
}

buttonC.addEventListener('click', clearResult);

buttonCE.addEventListener('click', () => {
    clearNum();
    if (whatIsNumber === 'firstNum') return firstNum = '';
    else if (whatIsNumber === 'secondNum') return secondNum = '';
})

simpleSigns.forEach((btn) => {
    btn.addEventListener('click', () => {
        calculate();
        sign = btn.textContent;
        if (!isResult) result.textContent = sign;
        else result.textContent = firstNum;
        finish = true;
    })
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
})

buttonFraction.addEventListener('click', () => {
    if (whatIsNumber === 'firstNum') fractionNumber(firstNum);
    else if (whatIsNumber === 'secondNum') fractionNumber(secondNum);
    return actualResult();
})

buttonRoot.addEventListener('click', () => {
    if (whatIsNumber === 'firstNum') sqrtNumber(firstNum);
    else if (whatIsNumber === 'secondNum') sqrtNumber(secondNum);
    return actualResult();
})

buttonMS.addEventListener('click', saveNumber)

buttonPlusMS.addEventListener('click', plusSaveMemory)

buttonMinusMS.addEventListener('click', minussaveMemory)

buttonMR.addEventListener('click', () => {
    result.textContent = memorySave;
})

buttonMC.addEventListener('click', () => {
    memorySave = null;
    buttonMR.disabled = true;
    buttonMC.disabled = true;
})

buttonPercent.addEventListener('click', percent)

openBracket.addEventListener('click', () => {
    console.log(firstNum, secondNum)
    savedSign = sign;
    calculate();
    if (whatIsNumber === 'firstNum') savedValue = firstNum;
    else if (whatIsNumber === 'secondNum') savedValue = secondNum;
    
   clearResult();
})

closeBracket.addEventListener('click', () => {
    calculate()
    if(savedValue === '' || savedValue === null) return;
    else if ( savedSign !== '') sign = savedSign;
        secondNum = firstNum;
        firstNum = savedValue;
        signBracketClose=')'
        savedValue = null;
        savedSign = null;

})

// числа 0-9 и .
numbers.forEach((btn) => {
    const buttonText = btn.textContent;
    btn.addEventListener('click', () => {
        if (secondNum ==='' && sign === '') {
            if (buttonText === '.' && firstNum.includes('.')) {
            firstNum += '';
            result.textContent = firstNum;
        } else {
            firstNum += buttonText;
            whatIsNumber = 'firstNum';
            result.textContent = firstNum;
        }
        }
        else if (firstNum!=='' && secondNum!=='' && finish) {
            if (sign === '') {
                firstNum = buttonText;
                result.textContent = firstNum;
                whatIsNumber = 'firstNum';
            }
            else {
                secondNum += buttonText;
                result.textContent = secondNum;
                whatIsNumber = 'secondNum';
                finish = false;
            }

        }
        else {
            secondNum += buttonText;
            result.textContent = secondNum;
            whatIsNumber = whatIsNumber = 'secondNum';
        }
        
        // expression = savedValue + ' ' + savedSign + ' ' + signBracketOpen + ' ' + firstNum + ' ' + sign + ' ' + secondNum + ' ' + signBracketClose;
        console.log(firstNum,secondNum,sign)
        return;
    })
    
})

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (firstNum !== '' && secondNum !== '' && sign === '') {
        firstNum = secondNum;
        secondNum = '';
        return;
    }
    if (secondNum ==='') secondNum = firstNum;
    
    calculate();
    })