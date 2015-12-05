// TODO: this needs to be VERY well-documented
const $promise = function ($q) {
  'ngInject';

  const of = function (value) {
    return $q.resolve(value);
  };

  const accumulateHelper = function (startPromise, promiseFns) {
    return _.reduce(
      promiseFns,
      function (accPromise, nextPromiseFn) {
        return accPromise.then(function (accValues) {
          return nextPromiseFn(accValues).then(function (nextValue) {
            const toReturn = _.merge({}, accValues, nextValue);
            return of(toReturn);
          });
        });
      },
      startPromise
    );
  };

  const accumulate = function (state, promiseFns) {
    return accumulateHelper(of(state), promiseFns);
  };

  const as = function (key, promiseFn, context) {
    context = context || this;

    return function (objs) {
      const promise = promiseFn.call(context, objs);
      return promise.then(function (result) {
        const keyedResult = _.object([key], [result]);
        return of(keyedResult);
      });
    };
  };

  return {
    accumulate: accumulate,
    as: as,
    of: of,
  };
};

export default $promise;
