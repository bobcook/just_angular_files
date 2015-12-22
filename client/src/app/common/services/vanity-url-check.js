const $vanityUrlCheck = function (ApiRoutes,
                                  $location,
                                  $postHref,
                                  $rootScope,
                                  $url) {
  'ngInject';

  const LOGIN_URL = ApiRoutes.AARP_AUTH;

  const DEFAULT_REDIRECT_URL = 'https://stayingsharp.aarp.org';

  // Protocol doesn't matter since we're not checking for it,
  // but still needed for constructing URLs
  const VANITY_DOMAIN_REDIRECTS = {
    'https://mystayingsharp.org': 'https://stayingsharp.aarp.org',
    'https://test-mystayingsharp.org': 'https://stayingsharp.test-aarp.org',
  };

  const VANITY_DOMAINS = _.keys(VANITY_DOMAIN_REDIRECTS);

  const VANITY_SIGNUP_PATHS = [
    '/',
    '/employee',
    '/employees',
    '/ssmember',
    '/ssmembers',
  ];

  const userLoggedIn = function () {
    return $rootScope.$currentUser && $rootScope.$currentUser.isLoggedIn;
  };

  const isVanityUrl = function (checkUrlStr) {
    return $url.urlHas($url.matchingPathname, checkUrlStr, VANITY_SIGNUP_PATHS);
  };

  // TODO: remove if/when redirection occurs at another level (i.e. DNS or S3)
  const isVanityDomain = function (origUrl) {
    return $url.urlHas($url.matchingHost, origUrl, VANITY_DOMAINS);
  };

  // TODO: remove if/when redirection occurs at another level (i.e. DNS or S3)
  const locationIsVanityDomain = function () {
    return isVanityDomain($location.absUrl());
  };

  // TODO: remove if/when redirection occurs at another level (i.e. DNS or S3)
  const redirectIfVanityDomain = function () {
    const result = locationIsVanityDomain();

    if (result) {
      const currentUrl = $location.absUrl();
      const destDomain = redirectDomainFor(currentUrl);
      const newUrl = $url.copyPathFrom(currentUrl, destDomain);

      console.log(`Was vanity domain; redirecting to ${newUrl}`);
      window.location = newUrl;
    };
    return result;
  };

  // TODO: remove if/when redirection occurs at another level (i.e. DNS or S3)
  const redirectDomainFor = function (domain) {
    domain = _.endsWith(domain, '/')
           ? _.dropRight(domain, 1).join('')
           : domain;

    const includesDomain = function (_redirect, checkDomain) {
      return _.includes(checkDomain, domain);
    };

    return _.find(VANITY_DOMAIN_REDIRECTS, includesDomain) ||
           DEFAULT_REDIRECT_URL;
  };

  const redirectIfVanityUrl = function () {
    const currentUrl = $location.absUrl();
    const result = isVanityUrl(currentUrl) && !userLoggedIn();
    if (result) {
      console.log('Check passed; redirecting');
      $postHref(redirectUrlFor(currentUrl), {});
    }
    return result;
  };

  const redirectUrlFor = function (currentUrl) {
    const fragmentsAndPromos = {
      employee: 'SS-EMPLOYEE',
      ssmember: 'SS-BETA',
    };

    const includesFragment = function (_promo, fragment) {
      return _.includes(currentUrl, fragment);
    };

    const promo = _.find(fragmentsAndPromos, includesFragment) || 'SM-SS';

    return `${ApiRoutes.AARP_AUTH}?promo=${promo}`;
  };

  const redirectIfNeeded = function () {
    return redirectIfVanityDomain() || redirectIfVanityUrl();
  };

  return {
    isVanityUrl: isVanityUrl,
    isVanityDomain: isVanityDomain,
    locationIsVanityDomain: locationIsVanityDomain,
    redirectIfVanityUrl: redirectIfVanityUrl,
    redirectIfNeeded: redirectIfNeeded,
    redirectUrlFor: redirectUrlFor,
  };
};

export default $vanityUrlCheck;
