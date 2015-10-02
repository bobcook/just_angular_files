const installEnvironment = function (module) {
  _.forOwn(window.__env, function (v, k) {
    module.constant(k, v);
  });
};

export default installEnvironment;
