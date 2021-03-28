const toTranslate = document.querySelector('#to-translate');
const translated = document.querySelector('#translated');
const translatorForm = document.querySelector('#translator');
const playBtn = document.querySelector('#translator-play');

const alphabet = {
    a: '.-',
    b: '-...',
    c: '-.-.',
    d: '-..',
    e: '.',
    f: '..-.',
    g: '--.',
    h: '....',
    i: '..',
    j: '.---',
    k: '-.-',
    l: '.-..',
    m: '--',
    n: '-.',
    o: '---',
    p: '.--.',
    q: '--.-',
    r: '.-.',
    s: '...',
    t: '-',
    u: '..-',
    v: '...-',
    w: '.--',
    x: '-..-',
    y: '-.--',
    z: '--..',
    1: '.----',
    2: '..---',
    3: '...--',
    4: '....-',
    5: '.....',
    6: '-....',
    7: '--...',
    8: '---..',
    9: '----.',
    0: '-----',
    а: '.-',
    б: '-...',
    в: '.--',
    г: '--.',
    д: '-..',
    е: '.',
    ж: '...-',
    з: '--..',
    и: '..',
    й: '.---',
    к: '-.-',
    л: '.-..',
    м: '--',
    н: '-.',
    о: '---',
    п: '.--',
    р: '.-.',
    с: '...',
    т: '-',
    у: '..-',
    ф: '..-.',
    х: '....',
    ц: '-.-.',
    ч: '---.',
    ш: '----',
    щ: '--.-',
    ъ: '.--.-.',
    ы: '-.--',
    ь: '-..',
    э: '...-...',
    ю: '..--',
    я: '.-.-',
    ä: '.-.-',
    á: '.--.-',
    å: '.--.-',
    é: '..-..',
    ñ: '--.--',
    ö: '---.',
    ü: '..--',
    '.': '.-.-.-',
    ',': '--..--',
    '?': '..--..',
    '!': '-.-.--',
    ':': '---...',
    '"': '.-..-.',
    '=': '-...-',
    '/': '-..-.',
    '(': '-.--.',
    ')': '-.--.-',
    '&': '.-...',
    ';': '-.-.-.',
    '+': '.-.-.',
    '-': '-....-',
    '_': '..--.-',
    '@': '.--.-.',
}

const audios = {
    '.': '#dot-sound',
    '-': '#dash-sound',
}

translatorForm.addEventListener('submit', e => {
    e.preventDefault();

    const result = toTranslate.value.split('').reduce(translate, '');
    translated.value = result;
})

toTranslate.addEventListener('keyup', e => {

    translated.value = toTranslate.value.split('').reduce(translate, '');
})

function translate(acc, symbol) {
    symbol = symbol.toLowerCase();
    if(symbol === ' ') {
        return acc += '/ '
    } else if(alphabet.hasOwnProperty(symbol)){
        return acc += alphabet[symbol] + ' '
    } else {
        return acc;
    }
}

playBtn.addEventListener('click', e => {
    const audioTrack = toTranslate.value.split('').reduce(setAudioTrack, '');
    playMorse(audioTrack);
})

function setAudioTrack(acc, symbol) {
    symbol = symbol.toLowerCase();
    if(symbol === ' ') {
        for(let i = 0; i < 6; i++) {acc += symbol}
        return acc
    } else if(alphabet.hasOwnProperty(symbol)){
        alphabet[symbol].split('').forEach(sign => {
            acc += sign + ' '
        })
        return acc += '  ';
    } else {
        return acc;
    }
}

function playMorse(track) {
    track.split('').forEach((item, index) => {
        setTimeout(() => {
            if(audios.hasOwnProperty(item)) {
                document.querySelector(audios[item]).play();
            }
        }, index * 160)
    }) 
}



