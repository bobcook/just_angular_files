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
    'http://www.mystayingsharp.org',
    'http://www.mystayingsharp.org/employee',
    'http://www.mystayingsharp.org/employees',
    'http://mystayingsharp.org',
    'http://mystayingsharp.org/employee',
    'http://mystayingsharp.org/employees',

    'http://www.stayingsharp.aarp.org',
    'http://www.stayingsharp.aarp.org/employee',
    'http://www.stayingsharp.aarp.org/employees',
    'http://stayingsharp.aarp.org',
    'http://stayingsharp.aarp.org/employee',
    'http://stayingsharp.aarp.org/employees',
     // TODO: remove these after done QAing
    'http://development.aarp-staying-sharp.divshot.io',
    'http://development.aarp-staying-sharp.divshot.io/employee',
    'http://development.aarp-staying-sharp.divshot.io/employees',
    'http://staging.aarp-staying-sharp.divshot.io',
    'http://staging.aarp-staying-sharp.divshot.io/employee',
    'http://staging.aarp-staying-sharp.divshot.io/employees',
    'http://localhost:9000',
    'http://localhost:9000/employee',
    'http://localhost:9000/employees',
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

  const redirectIfVanityUrl = function () {
    const currentUrl = $location.absUrl();
    const redirectUrl =
      _.includes(currentUrl, 'employee') ?
      `${ApiRoutes.AARP_AUTH}?promo=SS-EMPLOYEE` :
      `${ApiRoutes.AARP_AUTH}?promo=SM-SS`;

    const result = isVanityUrl(currentUrl) && !userLoggedIn()
    if (result) {
      console.log('Check passed; redirecting');
      $postHref(redirectUrl, {});
    }
    return result;
  };

  const redirectIfVanityDomain = function () {
    const result = locationIsVanityDomain()
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
    vanityUrls: VANITY_URLS,
  };
};

export default $vanityUrlCheck;
