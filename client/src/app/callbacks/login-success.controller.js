const LoginSuccessController = function ($loadCurrentUser,
                                         $state,
                                         $stateParams,
                                         $rootScope,
                                         $auth) {
  'ngInject';

  if ($stateParams.claimToken) {
    $auth.createSession($stateParams.claimToken).then(function () {
      $loadCurrentUser($rootScope.$currentUser).then(function () {
        if ($rootScope.$currentUser.membershipStatus === 'paid') {
          $state.go('application.home');
        } else {
          $state.go('application.unpaid-user-home');
        }
      }, function (){
        // TODO: might need rethink how to handle login failures
        $state.go('application.login-failure');
      });
    });
  }
};

export default LoginSuccessController;
