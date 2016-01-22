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
    if (_.isEmpty(pathname)) { return '/'; };
    return _.startsWith(pathname, '/') ? pathname : `/${pathname}`;
  };

  // $location only lets you manipulate the current URL...needed a
  // way to parse arbitrary URLs
  const makeUrl = function (urlString, elementFn) {
    elementFn =
      elementFn || function (href) { return $('<a>', { href: href })[0]; };

    const element = elementFn(urlString);
    const pathname = normalizePathname(element.pathname);
    return {
      host: element.host,
      hostname: element.hostname,
      href: element.href,
      origin: element.origin,
      pathname: pathname,
      protocol: element.protocol,
    };
  };

  const urlHas = function (predFn, checkUrlStr, otherUrlStrs) {
    const checkUrl = makeUrl(checkUrlStr);

    return _.any(otherUrlStrs, function (otherUrlStr) {
      const otherUrl = _.startsWith(otherUrlStr, 'http')
                     ? makeUrl(otherUrlStr)
                     : otherUrlStr;

      return predFn(checkUrl, otherUrl);
    });
  };

  const matchingHost = function (checkUrl, otherUrl) {
    const otherHost = otherUrl.host ? otherUrl.host : otherUrl;
    return checkUrl.host === otherHost;
  };

  const matchingPathname = function (checkUrl, otherUrl) {
    const otherPathname = otherUrl.pathname ? otherUrl.pathname : otherUrl;
    return checkUrl.pathname === otherPathname;
  };

  const matchingHostAndPathname = andAll(matchingHost, matchingPathname);

  const copyPathFrom = function (srcUrlStr, destUrlStr) {
    const srcUrl = makeUrl(srcUrlStr);
    const destUrl = makeUrl(destUrlStr);
    const path = srcUrl.pathname;
    const pathToAdd = _.startsWith(path, '/') ? path.slice(1) : path;

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
