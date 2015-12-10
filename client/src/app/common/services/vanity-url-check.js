// TODO: clean up once done QAing
const $vanityUrlCheck = function (ApiRoutes,
                                  $location,
                                  $postHref,
                                  $rootScope) {
  'ngInject';

  const LOGIN_URL = ApiRoutes.AARP_AUTH;

  // Protocol doesn't matter since we're not checking for it,
  // but still needed for URL constructor
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
  ];

  const userLoggedIn = function () {
    return $rootScope.$currentUser.isLoggedIn;
  };

  // $location only lets you manipulate the current URL...needed a
  // way to parse arbitrary URLs
  const makeUrl = function (urlString) {
    return $('<a>', { href: urlString } )[0];
  };

  const isVanityUrl = function (origUrl) {
    const url = makeUrl(origUrl);
    console.log('Orig URL');
    console.log('Host: ', url.host);
    console.log('Pathname: ', url.pathname);
    console.log('\n');
    console.dir(url);

    return _.any(VANITY_URLS, function (origCheckUrl) {
      const checkUrl = makeUrl(origCheckUrl);
      console.log('Check URL');
      console.log('CheckHost: ', checkUrl.host);
      console.log('CheckPathname: ', checkUrl.pathname);
      console.log('\n');

      return url.host === checkUrl.host && url.pathname === checkUrl.pathname;
    });
  };

  const locationIsVanityUrl = function () {
    const currentUrl = $location.absUrl();
    return isVanityUrl(currentUrl) && !userLoggedIn();
  };

  const redirectIfVanityUrl = function () {
    const currentUrl = $location.absUrl();

    console.log(`Attempting redirect to ${LOGIN_URL}`);

    if (isVanityUrl(currentUrl) && !userLoggedIn()) {
      console.log('Check passed; redirecting');
      $postHref(LOGIN_URL, {});
    }
  };

  return {
    vanityUrls: VANITY_URLS,
    locationIsVanityUrl: locationIsVanityUrl,
    isVanityUrl: isVanityUrl,
    redirectIfVanityUrl: redirectIfVanityUrl,
  };
};

export default $vanityUrlCheck;
