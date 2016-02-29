const SubscribeResourceModalController = function ($scope, dsoAuth, close) {
  'ngInject';

  $scope.close = close;
  $scope.dsoSubscribe = dsoAuth.dsoSubScribeAuth;
  $scope.login = dsoAuth.login;
  $scope.subscribe = dsoAuth.dsoSubScribeAuth;
};

export default SubscribeResourceModalController;
