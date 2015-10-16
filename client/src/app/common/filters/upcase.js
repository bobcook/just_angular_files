const upcase = function () {
  return function (string) {
    if (_.isUndefined(string) || _.isNull(string)) { return string; }
    return string.toUpperCase();
  };
};

export default upcase;
