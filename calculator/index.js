function el(selector) {
    if(selector[0] === '#') {
        return document.querySelector(selector);
    }
    return document.querySelectorAll(selector);
}
const numbers = el('.number');
const dot = el('#dot');
const operations = el('.operation');
const display = el('#display');
const equal = el('#equal');
const clean = el('#clean');

const calculation = {
    firstV: '',
    secondV: '',
    operation: ''
};

const isActive = {
    operator: false,
    equal: false
}

numbers.forEach(number => {
    number.addEventListener('click', e => {
        if(isActive.equal) {
            calculation.firstV = '';
            calculation.secondV = '';
            isActive.equal = false;
        }
        if(display.value === '0' && e.currentTarget.value === '0') {
            return;
        }
        fillDisplay(e.currentTarget.value);
        enable(e.currentTarget);
    })
});

dot.addEventListener('click', () => {
    if(display.value.includes('.')) {
        return;
    }
    if(display.value === '0' && !isActive.operator) {
        fillDisplay('0');
    }
    fillDisplay('.');
});

function fillDisplay(value) {
    if(!isActive.operator) {
        calculation.firstV += value;
        display.value = calculation.firstV;
    } else {
        calculation.secondV += value;
        display.value = calculation.secondV;
    }
}

operations.forEach(operation => {
    operation.addEventListener('click', e => {
        if(changeOperator(e.currentTarget)) return;
        enable(e.currentTarget);
        e.currentTarget.setAttribute('disabled', '');
        operationAfterOper()
        operationAfterEqual();
        calculation.operation = e.currentTarget.value;
        isActive.operator = true;
        // e.target.style.backgroundColor = '#c7b193'
        // console.log(calculation);
    })
});

function changeOperator(target) {
    for (const operation of operations) {
        if(operation.hasAttribute('disabled')) {
            enable(target);
            target.setAttribute('disabled', '');
            calculation.operation = target.value;
            return true;
        }
    }
    return false;
}

function operationAfterOper() {
    if(isActive.operator) {
        display.value = calculation.firstV = calculate();
        // isActive.operator = false;
        calculation.secondV = '';
    }
}

function operationAfterEqual() {
    if(isActive.equal) {
        calculation.secondV = '';
        isActive.equal = false;
    }
}

equal.addEventListener('click', e => {
    enable(e.currentTarget);
    if(isActive.equal) {
        calculation.firstV = display.value;
        setSecondValue();
        display.value = calculation.firstV = calculate();
        return;
    }
    // if(!calculation.operation) return;
    calculation.firstV = calculation.firstV || 0;
    setSecondValue();
    display.value = calculation.firstV = calculate();
    isActive.operator = false;
    isActive.equal = true;
});

function setSecondValue() {
    if(calculation.secondV === '') {
        calculation.secondV = calculation.firstV;
    }
}

clean.addEventListener('click', e => {
    display.value = 0;
    for (const key in calculation) {
        calculation[key] = '';
    }
    enable(e.currentTarget);
    console.log(calculation);
    isActive.operator = false;
    isActive.equal = false;
});

function enable(target) {
    if(target.value !== calculation.operation) {
        operations.forEach(operation => {
            operation.removeAttribute('disabled');
        })
    }
}

function calculate() {
    let res;
    switch(calculation.operation) {
        case '+':
            res = +calculation.firstV + +calculation.secondV;
            break;
        case '-':
            res = +calculation.firstV - calculation.secondV;
            break;
        case '*':
            res = +calculation.firstV * calculation.secondV;
            break;
        case '/':
            res = +calculation.firstV / calculation.secondV;
            break;
        default:
            res = +calculation.firstV;
    }
    res = res.toFixed(9).replace(/0+$/, '');
    return parseFloat(res)
}