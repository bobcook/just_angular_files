const $userStatusRedirectCheck = function ($location,
                                          $state,
                                          $q,
                                          $timeout,
                                          ApiRoutes,
                                          $postHref) {
  'ngInject';

  const unpaidPathName = 'unpaid-user-home';

  // TODO: consider pushing the promise success / failure to
  // callsites so it's apparent _why_ we're succeeding / rejecting
  const redirectIfUnpaid = function (currentUser) {
    if (currentUser.isPaid) {
      return $q.when();
    } else {
      $timeout(redirectUnpaid);
      return $q.reject();
    }
  };

  const redirectLogin = function () {
    const currentPath = $location.path();

    $timeout(function () {
      $postHref(
        ApiRoutes.AARP_AUTH, { promo: 'SS-BETA', redirectPath: currentPath }
      );
    });
    return $q.reject();
  };

  const redirectUnpaid = function () {
    $state.go(unpaidPathName);
  };

  return {
    redirectIfUnpaid: redirectIfUnpaid,
    redirectLogin: redirectLogin,
    redirectUnpaid: redirectUnpaid,
  };
};

export default $userStatusRedirectCheck;
