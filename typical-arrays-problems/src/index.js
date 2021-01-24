const compare = (array, min) => {
  if (!array || !array.length) return 0;
  return array.reduce((comp, el) => (min ? el < comp : el > comp) ? comp = el : comp, array[0]);
};

exports.min = (array) => compare(array, true);
exports.max = (array) => compare(array, false);
exports.avg = function avg (array) {
  if (!array || !array.length) return 0;
  return array.reduce((sum,  el) => sum += el, 0) / array.length;
}
