function Expression(tokens) {
  this.findSubExpression = function() {
    let result = false;
    let parenthesisStack = [];

    this.tokens.some((token, i) => {
      if (token === '(') parenthesisStack.push(i);
      if (token === ')') {
        if (parenthesisStack.length == 1) {
          result = [parenthesisStack.pop(), i];
          return true;
        } else if (!parenthesisStack.length) {
          throw new Error('ExpressionError: Brackets must be paired');
        } else {
          parenthesisStack.pop();
          return false;
        }
      }
    });

    if (parenthesisStack.length) throw new Error('ExpressionError: Brackets must be paired');

    return result;
  };

  this.applyTokens = function() {
    let subExpression;
    while (subExpression = this.findSubExpression()) {
      this.tokens.splice(
        subExpression[0],
        subExpression[1] - subExpression[0] + 1,
        new Expression(this.tokens.slice(subExpression[0] + 1, subExpression[1]))
      );
    }
  };

  this.getPrioritizedOpt = function(el) {
    const index = this.tokens.findIndex(token => token === '*' || token === '/');
    if (index !== -1) return [index, this.tokens[index]];
    return [1, this.tokens[1]];
  };

  this.calculateOpt = function(arg1, arg2, opt) {
    const val1 = (typeof arg1) === 'object' ? arg1.calculate() : Number.parseFloat(arg1);
    const val2 = (typeof arg2) === 'object' ? arg2.calculate() : Number.parseFloat(arg2);
    switch (opt) {
      case '+': return val1 + val2;
      case '-': return val1 - val2;
      case '*': return val1 * val2;
      case '/': {
        if (val2 == 0) throw new TypeError('TypeError: Division by zero.');
        return val1 / val2;
      }
    }
  };

  this.calculate = function() {
    while (this.tokens.length > 1) {
      const opt = this.getPrioritizedOpt();
      this.tokens.splice(
        opt[0] - 1,
        3,
        this.calculateOpt(this.tokens[opt[0] - 1], this.tokens[opt[0] + 1], opt[1])
      );
    }
    return this.tokens[0];
  };

  this.tokens = tokens;
  this.applyTokens();
}

function tokenize(str) {
  let numBuffer = '';
  return str.split('').reduce((tokens, el, i) => {
    if (isNaN(el) || el === '' || el === ' ') {
      if (numBuffer.length) {
        tokens.push(numBuffer);
        numBuffer = '';
      }
      switch (el) {
        case '(':
        case ')':
        case '+':
        case '-':
        case '/':
        case '*': tokens.push(el);
      }
    } else {
      numBuffer += el;
      if (i === str.length - 1) tokens.push(numBuffer);
    }
    return tokens;
  }, []);
}

module.exports = { expressionCalculator: expr => new Expression(tokenize(expr)).calculate() }
