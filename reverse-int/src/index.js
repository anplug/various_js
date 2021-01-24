module.exports = function reverse (n) {
  const sNum = (Math.abs(n) + '').split('');
  return +sNum.reduce((arr, el, i) => {
    arr[sNum.length - i - 1] = el;
    return arr;
  }, []).join('');
};
