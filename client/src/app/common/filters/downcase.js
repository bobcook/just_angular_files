const downcase = function () {
  return function (string) {
    if (_.isUndefined(string) || _.isNull(string)) { return string; }
    return string.toLowerCase();
  };
};

export default downcase;
