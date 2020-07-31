exports.uniqueCode = function () {
  return (
    Date.now().toString(36).substr(4, 5) +
    Math.random().toString(36).substr(3, 4)
  ).toUpperCase();
};
