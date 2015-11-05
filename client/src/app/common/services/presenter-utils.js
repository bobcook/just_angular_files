const $presenterUtils = function () {
  const forController = function (fields, controller) {
    _.each(fields, function (v, k) {
      controller[k] = v;
    });
    return controller;
  };

  const returnsEmtpyObject = _.constant({});

  const mergeFields = function (resource,
                                controller,
                                defaultsFn,
                                overridesFn) {

    defaultsFn = defaultsFn || returnsEmptyObject;
    overridesFn = overridesFn || returnsEmptyObject;
    const defaults = defaultsFn(resource, controller);
    const overrides = overridesFn(resource, controller);
    return _.merge({}, defaults, overrides);
  };

  const withFieldsFrom = function (defaultsFn, overridesFn) {
    return function (controller, resource) {
      const fields = mergeFields(resource, controller, defaultsFn, overridesFn);
      return forController(fields, controller);
    };
  };

  return {
    withFieldsFrom: withFieldsFrom,
  };
};

export default $presenterUtils;
