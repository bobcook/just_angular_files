const LoginSuccessController = function ($auth, $state, $stateParams) {
  'ngInject';

  if ($stateParams.claimToken) {
    $auth.createSession($stateParams.claimToken).then(function () {
      $state.go('application.home');
    }, function () {
      $state.go('application.login-failure');
    });
  }
};

export default LoginSuccessController;
