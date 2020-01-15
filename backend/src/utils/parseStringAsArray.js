module.exports = function parseStringAsArray(string) {
  return string.split(",").map(s => s.trim());
};
