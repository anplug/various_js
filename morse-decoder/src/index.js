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

function splitChunks(str, n) {
  let result = [];
  for (let i = 0; i < str.length; i += n) {
    result.push(str.slice(i, i + n));
  }
  return result;

}

function getCode(sym) {
  return splitChunks(sym, 2).map(el => {
    switch(el) {
      case '10' : return '.';
      case '11' : return '-';
      default : return '';
    }
  }).join('');
}

function decode(expr) {
  return splitChunks(expr, 10).map(sym => {
    if (sym[0] == '*') return ' ';
    return MORSE_TABLE[getCode(sym)];
  }).join('');
}

module.exports = { decode };
