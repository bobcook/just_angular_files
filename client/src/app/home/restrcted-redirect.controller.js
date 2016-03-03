const RestrictedRedirectContoller = function ($scope, dsoAuth, close) {
  'ngInject';

  $scope.close = close;
  $scope.subscribe = dsoAuth.dsoSubscribeAuth;
  $scope.login = dsoAuth.login;
};

export default RestrictedRedirectContoller;
