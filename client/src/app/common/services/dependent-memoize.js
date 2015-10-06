// The `dependentMemoize` service helps to avoid Angular's "infinite digest"
// errors by wrapping a function and automatically caching its return data.
// Traditional memoization functions (such as lodash/underscore's _.memoize) are
// insufficient here; functions exposed on Angular controllers are often
// dependent on instance or controller state, not function arguments.
//
// To accomodate this, `dependentMemoize` accepts two arguments, both of which
// are functions:
//   - dependencyResolver: Produces a value that serves as the memoization
//       "key".
//   - fn: The actual function that computes the result of the wrapped function.
//
// The special `dependencyResolver` function takes no arguments. It is called
// every time the memoized function is called, and its value is cached. If two
// successive calls to `dependencyResolver` return the same value (where "same"
// is determined by deep equality, implemented with angular.equals), then `fn`
// is not invoked. Instead, the previous result from `fn` is returned with no
// further calculation.
//
// This means that `fn` should be a "pure" function, but instead of being
// strictly pure only in terms of its arguments, it can use values from the
// surrounding environment. All of the values pulled from the surrounding
// environment should be encoded into the result of `dependencyResolver`, so
// whenever those values change, the cache is invalidated.
//
// Example:
// > let x = 5;
// > const xDoubled = dependentMemoize(() => x, function () {
//     console.log('called the function!');
//     return x * 2;
//   });
// > xDoubled()
// called the function!
// 10
// > xDoubled()
// 10
// > x = 4;
// > xDoubled()
// called the function!
// 8
// > xDoubled()
// 8
//
// In addition to using `dependentMemoize` as a function directly, there is also
// `dependentMemoize.defineProperty`, which serves as a shorthand for using
// `dependentMemoize` with `Object.defineProperty`. It is defined as a simple
// transformation, so the following two expressions are equivalent:
//
// dependentMemoize.defineProperty(obj, prop, dep, fn);
// Object.defineProperty(obj, prop, { get: dependentMemoize(dep, fn) });
const dependentMemoize = function () {
  const dependentMemoize = function (dependencyResolver, fn) {
    let resolvedOnce = false;
    let cachedDependency;
    let cachedValue;

    return function (...args) {
      const dependency = dependencyResolver(...args);
      if (!resolvedOnce || !angular.equals(dependency, cachedDependency)) {
        resolvedOnce = true;
        cachedDependency = angular.copy(dependency);
        cachedValue = fn(dependency);
      }
      return cachedValue;
    };
  };

  dependentMemoize.defineProperty =
    function (obj, name, dependencyResolver, fn) {
      Object.defineProperty(obj, name, {
        get: dependentMemoize(dependencyResolver, fn),
      });
    };

  return dependentMemoize;
};

export default dependentMemoize;
