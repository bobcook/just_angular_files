const LogoutController = function ($auth, $log, $state) {
  'ngInject';

  $auth.destroySession().then(function () {
    $state.go('application.home');
  }, function (response) {
    $log.error(response);
    $state.go('application.home');
  });
};

export default LogoutController;
