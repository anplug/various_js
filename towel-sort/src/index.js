module.exports = function towelSort (matrix) {
  return (matrix || []).reduce((res, el, i) => {
    if (i % 2 != 0) el = el.reverse();
    return res.concat(el);
  }, []);
}
