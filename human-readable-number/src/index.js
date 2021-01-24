const TERM_MAPPING = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
  30: 'thirty',
  40: 'forty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety',
  100: 'hundred',
  1000: 'thousand'
}

module.exports = function toReadable(number) {
  if (number == 0) return 'zero';

  return mapTokens(tokenize(getTerms(number)));
}

const getTerms = num => {
  const arr = num.toString().split('');
  const len = arr.length;
  let terms = [];

  for (let i = 0; i < len; i++) {
    if (i == len - 2) {
      const lastTerm = +(arr[i] + arr[len - 1]);
      if (TERM_MAPPING[lastTerm]) {
        terms.push(lastTerm);
        return terms;
      }
    }

    let term = +arr[i] * 10**(len - i - 1);
    if (term != 0) terms.push(term);
  }

  return terms;
};

const tokenize = terms => {
  let tokens = [];

  terms.forEach(term => {
    const strTerm = term + '';
    if (strTerm.length < 3 && TERM_MAPPING[term]) return tokens.push(term);
    const base = 10 ** (strTerm.length - 1);
    const count = Math.trunc(term / base);
    tokens.push(count);
    tokens.push(base);
  });

  return tokens;
};

const mapTokens = tokens => tokens.map(t => TERM_MAPPING[t]).join(' ');;
