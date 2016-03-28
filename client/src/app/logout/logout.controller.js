const LogoutController = function ($auth, $log, $state, $cookies) {
  'ngInject';

  // Remove promoCode cookie so user isn't treated as beta user or employee
  // user when logged out or if they log in as different user.
  $cookies.remove('promoCode');

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
