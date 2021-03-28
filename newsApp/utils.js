function print(...content) {
    console.log(...content);
}

function getSize(element = document.documentElement, size = '') {
    if(!(element instanceof HTMLElement)) {
        return console.error('First argument must be a HTMLElement');
    }
    if(typeof size !== 'string') {
        return console.error('Second argument must be a string');
    }
    if(!size) {
        return {
            width: parseFloat(getComputedStyle(element).width),
            height: parseFloat(getComputedStyle(element).height),
            inset: {
                top: parseFloat(getComputedStyle(element).top),
                right: parseFloat(getComputedStyle(element).right),
                bottom: parseFloat(getComputedStyle(element).bottom),
                left: parseFloat(getComputedStyle(element).left),
            },
            margin: {
                top: parseFloat(getComputedStyle(element).marginTop),
                right: parseFloat(getComputedStyle(element).marginRight),
                bottom: parseFloat(getComputedStyle(element).marginBottom),
                left: parseFloat(getComputedStyle(element).marginLeft),
            },
            padding: {
                top: parseFloat(getComputedStyle(element).paddingTop),
                right: parseFloat(getComputedStyle(element).paddingRight),
                bottom: parseFloat(getComputedStyle(element).paddingBottom),
                left: parseFloat(getComputedStyle(element).paddingLeft),
            },
            rect: {
                top: element.getBoundingClientRect().top,
                right: element.getBoundingClientRect().right,
                bottom: element.getBoundingClientRect().bottom,
                left: element.getBoundingClientRect().left, 
            }
        }
    }
    return parseFloat(getComputedStyle(element)[size])
}

function el(selector) {
    return document.querySelector(selector);
}

function els(selector) {
    return [...document.querySelectorAll(selector)];
}

function valueOf(selector) {
    return document.querySelector(selector).value || null;
}

function styleOf(selector) {
    return document.querySelector(selector).style;
}

function classOf(selector) {
    return document.querySelector(selector).classList;
}