const $url = function () {
  'ngInject';

  // TODO: extend _
  //
  // Takes a series of predicate functions (i.e. functions that return true/
  // false) and some arguments. Applies each function to the arguments,
  // accumulating with &&
  //
  // Example:
  //
  // andAll(_.constantly(true), _.constantly(true))('hi') => true
  // andAll(_.constantly(true), _.constantly(false))('hi') => false
  const andAll = function () {
    const fns = arguments;

    return function () {
      const args = arguments;

      return _.reduce(
        fns,
        function (acc, fn) {
          return acc && fn.apply(null, args);
        },
        true
      );
    };
  };

  const normalizePathname = function (pathname) {
    if (_.isEmpty(pathname)) { return ''; };
    return _.startsWith(pathname, '/') ? pathname : `/${pathname}`;
  };

  // $location only lets you manipulate the current URL...needed a
  // way to parse arbitrary URLs
  const makeUrl = function (urlString, elementFn) {
    // TODO use URL parsing lib (urijs?) instead of this hack
    elementFn =
      elementFn || function (href) { return $('<a>', { href: href })[0]; };

    const element = elementFn(urlString);
    element.pathname = normalizePathname(element.pathname);
    return element;
  };

  const urlHas = function (predFn, checkUrlStr, otherUrlStrs) {
    const checkUrl = makeUrl(checkUrlStr);

    return _.any(otherUrlStrs, function (otherUrlStr) {
      const otherUrl = makeUrl(otherUrlStr);

      return predFn(checkUrl, otherUrl);
    });
  };

  const matchingHost = function (checkUrl, otherUrl) {
    return checkUrl.host === otherUrl.host;
  };

  const matchingPathname = function (checkUrl, otherUrl) {
    return checkUrl.pathname === otherUrl.pathname;
  };

  const matchingHostAndPathname = andAll(matchingHost, matchingPathname);

  const copyPathFrom = function (srcUrlStr, destUrlStr) {
    const srcUrl = makeUrl(srcUrlStr);
    const destUrl = makeUrl(destUrlStr);
    const pathToAdd = srcUrl.pathname.slice(1);

    return destUrl.href + pathToAdd;
  };

  return {
    copyPathFrom: copyPathFrom,
    makeUrl: makeUrl,
    matchingHost: matchingHost,
    matchingPathname: matchingPathname,
    matchingHostAndPathname: matchingHostAndPathname,
    urlHas: urlHas,
  };
};

export default $url;
