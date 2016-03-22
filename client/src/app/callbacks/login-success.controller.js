const LoginSuccessController = function ($loadCurrentUser,
                                         $state,
                                         $location,
                                         $stateParams,
                                         $rootScope,
                                         $scope,
                                         $auth,
                                         $timeout,
                                         $cookies) {
  'ngInject';

  const goToRedirectPath = function (redirectPath) {
    const doRedirect = function () {
      redirectPath = redirectPath || '/';
      $location.url(redirectPath);
      $scope.$apply();
    };

    if (isLeadBetaUser()) {
      $timeout(goToLeadBetaLanding);
    } else {
      $timeout(doRedirect); // Wait for current digest cycle before redirecting
    }
  };

  const isLeadBetaUser = function () {
    const isBetaPromo = $stateParams.promo === 'SS-BETA';
    const isLeadStatus = $rootScope.$currentUser.membershipStatus === 'lead';
    const isProspectStatus =
      $rootScope.$currentUser.membershipStatus === 'prospect';
    return (isProspectStatus) && isBetaPromo;
  };

  const goToLeadBetaLanding = function () {
    $location.url('/lead-beta-landing');
    $scope.$apply();
  };

  const existingPromo = function () {
    return $cookies.get('promoCode');
  };

  const incomingPromo = function () {
    return $stateParams.promo;
  };

  const removePromoCookie = function () {
    if (existingPromo()) {
      $cookies.remove('promoCode');
    }
  };

  const savePromo = function () {
    if (incomingPromo()) {
      $cookies.put('promoCode', incomingPromo());
    } else {
      removePromoCookie();
    };
  };

  if ($stateParams.claimToken) {
    $auth.createSession($stateParams.claimToken).then(function () {
      $loadCurrentUser($rootScope.$currentUser).then(function () {
        savePromo();
        goToRedirectPath($stateParams.redirectPath);
      }, function (){
        // TODO: might need rethink how to handle login failures
        $state.go('application.login-failure');
      });
    });
  }
};

export default LoginSuccessController;
