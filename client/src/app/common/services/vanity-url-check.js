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
    'https://mystayingsharp.org',
    'https://mystayingsharp.org/employee',
    'https://mystayingsharp.org/employees',

    'https://www.stayingsharp.aarp.org',
    'https://www.stayingsharp.aarp.org/employee',
    'https://www.stayingsharp.aarp.org/employees',
    'https://stayingsharp.aarp.org',
    'https://stayingsharp.aarp.org/employee',
    'https://stayingsharp.aarp.org/employees',
     // TODO: remove these after done QAing
    'https://development.aarp-staying-sharp.divshot.io',
    'https://development.aarp-staying-sharp.divshot.io/employee',
    'https://development.aarp-staying-sharp.divshot.io/employees',
    'https://staging.aarp-staying-sharp.divshot.io',
    'https://staging.aarp-staying-sharp.divshot.io/employee',
    'https://staging.aarp-staying-sharp.divshot.io/employees',
    'https://localhost:9000',
    'https://localhost:9000/employee',
    'https://localhost:9000/employees',
    'https://jordanielwolk.ngrok.com',
    'https://jordanielwolk.ngrok.com/employee',
    'https://jordanielwolk.ngrok.com/employees',
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

    const result = isVanityUrl(currentUrl) && !userLoggedIn();
    if (result) {
      console.log('Check passed; redirecting');
      $postHref(redirectUrl, {});
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
    vanityUrls: VANITY_URLS,
  };
};

export default $vanityUrlCheck;
