const transformConfig = function(config) {
  return config.reduce((res, el) => {
    res[el[0]] = el[1];
    return res;
  }, {});
};

const end = function(symb, config) {
  const el = config.find(pair => pair[0] == symb);
  return el && el[1];
}

function check(str, config) {
  console.log(`Code is ${str}`);
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    const current = str[i];
    console.log(`Current symbol = ${current}`);
    console.log(`Stack = ${stack}`);
    if (stack.length == 0) {
      console.log(`Stack is empty ${current} -> stack\n`);
      stack.push(str[i]);
      continue;
    }
    const head = stack[stack.length - 1];
    console.log(`Stack head is = ${head}`);
    if (current == end(head, config)) {
      console.log(`${current} is closing for ${head}`);
      console.log(`Pop stack`);
      stack.pop();
    } else {
      console.log(`${current} is NOT closing for ${head} , ${current} -> stack `);
      stack.push(current);
    }
  }

  return stack.length == 0;
}

module.exports = check;

const config5 = [['(', ')'], ['|', '|']];

console.log(check('|()|(||)||', config5));
