const hyphenate = function () {
  return function (string) {
    return _.kebabCase(string);
  };
};

export default hyphenate;
