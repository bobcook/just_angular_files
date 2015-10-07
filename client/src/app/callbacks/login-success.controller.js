const LoginSuccessController = function ($loadCurrentUser,
                                         $state,
                                         $stateParams,
                                         $rootScope,
                                         $auth) {
  'ngInject';

  if ($stateParams.claimToken) {
    $auth.createSession($stateParams.claimToken).then(function () {
      $loadCurrentUser($rootScope.$currentUser).then(function () {
        $state.go('application.home');
      }, function (){
        // TODO: might need rethink how to handle login failures
        $state.go('application.login-failure');
      });
    });
  }
};

export default LoginSuccessController;
