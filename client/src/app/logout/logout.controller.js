const LogoutController = function ($auth, $log, $state, $cookies) {
  'ngInject';

  // Remove beta modal cookies on logout so modal pops up when user logs in.
  $cookies.remove('betaModal');

  $auth.destroySession().then(function () {
    window.location.href =
      'http://www.aarp.org/online-community/forward/logout.action' +
      `?referrer=${window.location.protocol}//${window.location.host}`;
  }, function (response) {
    $log.error(response);
    $state.go('application.home');
  });
};

export default LogoutController;
