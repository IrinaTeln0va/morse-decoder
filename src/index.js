const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

const MORSE_ARR = Object.entries(MORSE_TABLE);

function decode(expr) {
    const encodedWordsArr = expr.split('**********');
    const decodedWordsArr = encodedWordsArr.map((encodedWord) => {
        return decodeWord(encodedWord);
    });
    return decodedWordsArr.join(' ');
}

const decodeWord = (encodedWord) => {
    const encodedLettersArr = devideWordIntoLetters(encodedWord);
    const decodedLettersArr = encodedLettersArr.map((encodedLetter) => {
        for (let i = 0; i < encodedLetter.length; i++) {
            if (encodedLetter[i] == '0') {
                i++;
            } else {
                return decodeLetter(encodedLetter.slice(i));
            }
        }
    });
    return decodedLettersArr.join('');
}

const devideWordIntoLetters = (encodedWord) => {
    const encodedLettersArr = [];
    for (let i = 0; i < encodedWord.length; i += 10) {
        encodedLettersArr.push(encodedWord.slice(i, i + 10));
    }
    return encodedLettersArr;
}

const decodeLetter = (numericCodeStr) => {
    let numericPairArr = [];
    for (let i = 0; i < numericCodeStr.length; i+=2) {
        numericPairArr.push(numericCodeStr.slice(i, i + 2));
    }

    let morseKey = numericPairArr.map((elem) => {
        if (elem == '10') {
            return '.';
        } else {
            return '-';
        }
    }).join('');

    let decodedLetter;
    MORSE_ARR.forEach(([key, value]) => {
        if (key == morseKey) {
            decodedLetter = value;
        }
    });
    return decodedLetter;
}

module.exports = {
    decode
}