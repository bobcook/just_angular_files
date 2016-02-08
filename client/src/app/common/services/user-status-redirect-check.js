const $userStatusRedirectCheck = function ($injector,
                                          $location,
                                          $rootScope,
                                          ApiRoutes,
                                          $postHref) {
  'ngInject';

  const unpaidPathName = 'application.unpaid-user-home';
  // NOTE: must use $injector.get('$state') instead of $state to avoid circular
  // dependencies when using this service in an interceptor
  const getURL = function (pathName) {
    return $injector.get('$state').get(pathName).url.split('/:')[0];
  };

  const redirectLogin = function () {
    $postHref(`${ApiRoutes.AARP_AUTH}?promo=SS-BETA`, {});
  };

  const shouldRedirectUnpaid = function () {
    return $rootScope.$currentUser && !$rootScope.$currentUser.isPaid &&
      $location.path() !== getURL(unpaidPathName);
  };

  const redirectUnpaid = function () {
    // set $location.path to avoid endless redirect loop on initial page load
    $location.path(getURL(unpaidPathName));
    $injector.get('$state').go(unpaidPathName);
  };

  return {
    redirectLogin: redirectLogin,
    shouldRedirectUnpaid: shouldRedirectUnpaid,
    redirectUnpaid: redirectUnpaid,
  };
};

export default $userStatusRedirectCheck;
