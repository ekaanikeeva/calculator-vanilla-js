
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
const fullFormula = document.querySelector('.result_formula');

let sign = ''; 
let firstNum = ''; 
let secondNum = ''; 
let percentOfNum = null;
let finish  = false;
let isResult = false;
let whatIsNumber = null;
let memorySave = null;
let savedValue = '';
let savedSign = '';
let expression = '';
let signBracketOpen = '';
let signBracketClose = '';

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

// записать результат в переменные
function actualResult () {
    if (whatIsNumber === 'firstNum') {
        if (result.textContent == 0) return firstNum = '';
        else return firstNum = result.textContent;
    } 
    else if (whatIsNumber === 'secondNum') {
        if (result.textContent == 0) return secondNum = '';
        else return secondNum = result.textContent;
    }
    saveFullFormula();
}

// поменять у числа + на - и наоборот
function changeNumberSign (number) {
    if (number > 0) return result.textContent = `-${number}`;
    else {
        let positiveNumber = number.split('');
        positiveNumber.shift();
        return result.textContent = positiveNumber.join('');
    } 
}

// сумма чисел
function sumNumbers () {
    return firstNum = (+firstNum) + (+secondNum);
}

// вычитание
function minusingNumbers () {
    return firstNum = firstNum - secondNum;
}

// уменьшить / сбросить число
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

// число в квадрат
function quadrateNumber (number) {
    result.textContent = number * number;
}

// дробь 1/число
function fractionNumber (number) {
    result.textContent = 1 / number;
}

// корень из числа
function sqrtNumber (number) {
    result.textContent = Math.sqrt(number);
    saveFullFormula();
}

// сохранить в Memory
function saveNumber () {
    buttonMR.disabled = false;
    buttonMC.disabled = false;
    saveFullFormula();
    return memorySave = result.textContent;
    
}

// прибывить к сохраненному в Memory
function plusSaveMemory () {
    if (memorySave === null) return saveNumber();
    else return memorySave = (+memorySave) + (+result.textContent);
}

// сохраненное число минус текущее
function minussaveMemory () {
    return memorySave = memorySave - result.textContent;
}

// процент
function percent () {
    if (whatIsNumber === 'firstNum') return result.textContent = 0;
    else if (whatIsNumber === 'secondNum') {
        switch (sign) {
            case '+':
                secondNum = secondNum * firstNum / 100;
                result.textContent = secondNum;
                break;
            case '-':
                secondNum = secondNum * firstNum / 100;
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

function saveFullFormula () {
    expression = savedValue + ' ' + savedSign + ' ' + signBracketOpen + ' ' + firstNum + ' ' + sign + ' ' + secondNum + ' ' + signBracketClose;
    return fullFormula.textContent = expression;
}

// слушатели кнопок

buttonC.addEventListener('click', clearResult);

buttonCE.addEventListener('click', () => {
    clearNum();
    if (whatIsNumber === 'firstNum') return firstNum = '';
    else if (whatIsNumber === 'secondNum') return secondNum = '';
})

// слушатель кнопок + - / *
simpleSigns.forEach((btn) => {
    btn.addEventListener('click', () => {
        calculate();
        sign = btn.textContent;
        if (!isResult) result.textContent = sign;
        else result.textContent = firstNum;
        finish = true;
        saveFullFormula();
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
    if (whatIsNumber === 'firstNum') firstNum = memorySave;
    else if (whatIsNumber === 'secondNum') secondNum = memorySave;
})

buttonMC.addEventListener('click', () => {
    memorySave = null;
    buttonMR.disabled = true;
    buttonMC.disabled = true;
})

buttonPercent.addEventListener('click', percent)

openBracket.addEventListener('click', () => {
    savedSign = sign;
    calculate();
    if (whatIsNumber === 'firstNum') savedValue = firstNum;
    else if (whatIsNumber === 'secondNum') savedValue = secondNum;
    signBracketOpen = `(`;
    clearResult();
    saveFullFormula();
    signBracketClose = `)`;
})

closeBracket.addEventListener('click', () => {
    calculate()
    if(savedValue === '') return;
    else if ( savedSign !== '') sign = savedSign;
        secondNum = firstNum;
        firstNum = savedValue;
        signBracketClose=')'
        savedValue = '';
        savedSign = '';
        signBracketClose = '';
        signBracketOpen = '';
        saveFullFormula();
        
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
        else if (buttonText === '.' && secondNum.includes('.')) {
            secondNum += '';
            result.textContent = secondNum;
        }
        else {
            secondNum += buttonText;
            result.textContent = secondNum;
            whatIsNumber = whatIsNumber = 'secondNum';
        }
        saveFullFormula();
        return;
    })
    
})

// слушатель формы
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (firstNum !== '' && secondNum !== '' && sign === '') {
        firstNum = secondNum;
        secondNum = '';
        return;
    }
    if (secondNum ==='') secondNum = firstNum;
    expression = '';
    fullFormula.textContent = '';
    signBracketClose = '';
    signBracketOpen = '';
    calculate();
    })