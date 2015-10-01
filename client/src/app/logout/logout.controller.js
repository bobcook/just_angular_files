const LogoutController = function ($auth, $state) {
  'ngInject';

  $auth.destroySession();
  $state.go('application.home');
};

export default LogoutController;
