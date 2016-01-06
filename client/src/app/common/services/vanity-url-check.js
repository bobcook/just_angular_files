const $vanityUrlCheck = function (ApiRoutes,
                                  $location,
                                  $postHref,
                                  $rootScope,
                                  $url) {
  'ngInject';

  const LOGIN_URL = ApiRoutes.AARP_AUTH;

  const REDIRECT_DOMAIN = 'https://stayingsharp.aarp.org';

  // Protocol doesn't matter since we're not checking for it,
  // but still needed for constructing URLs
  const VANITY_DOMAINS = [
    'https://mystayingsharp.org',
  ];

  const VANITY_URLS = [
    'https://www.mystayingsharp.org',
    'https://www.mystayingsharp.org/employee',
    'https://www.mystayingsharp.org/employees',
    'https://www.mystayingsharp.org/ssmember',
    'https://www.mystayingsharp.org/ssmembers',
    'https://mystayingsharp.org',
    'https://mystayingsharp.org/employee',
    'https://mystayingsharp.org/employees',
    'https://mystayingsharp.org/ssmember',
    'https://mystayingsharp.org/ssmembers',

    'https://www.stayingsharp.aarp.org',
    'https://www.stayingsharp.aarp.org/employee',
    'https://www.stayingsharp.aarp.org/employees',
    'https://www.stayingsharp.aarp.org/ssmember',
    'https://www.stayingsharp.aarp.org/ssmembers',
    'https://stayingsharp.aarp.org',
    'https://stayingsharp.aarp.org/employee',
    'https://stayingsharp.aarp.org/employees',
    'https://stayingsharp.aarp.org/ssmember',
    'https://stayingsharp.aarp.org/ssmembers',
  ];

  const userLoggedIn = function () {
    return $rootScope.$currentUser && $rootScope.$currentUser.isLoggedIn;
  };

  const isVanityUrl = function (checkUrlStr) {
    return $url.urlHas($url.matchingHostAndPathname, checkUrlStr, VANITY_URLS);
  };

  const isVanityDomain = function (origUrl) {
    return $url.urlHas($url.matchingHost, origUrl, VANITY_DOMAINS);
  };

  const locationIsVanityDomain = function () {
    return isVanityDomain($location.absUrl());
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

  const redirectIfVanityUrl = function () {
    const currentUrl = $location.absUrl();
    const result = isVanityUrl(currentUrl) && !userLoggedIn();
    if (result) {
      console.log('Check passed; redirecting');
      $postHref(redirectUrlFor(currentUrl), {});
    }
    return result;
  };

  const redirectIfVanityDomain = function () {
    const result = locationIsVanityDomain();
    if (result) {
      const currentUrl = $location.absUrl();
      const destUrl = REDIRECT_DOMAIN;
      const newUrl = $url.copyPathFrom(currentUrl, destUrl);

      console.log(`Was vanity domain; redirecting to ${newUrl}`);
      window.location = newUrl;
    };
    return result;
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
    vanityUrls: VANITY_URLS,
  };
};

export default $vanityUrlCheck;
