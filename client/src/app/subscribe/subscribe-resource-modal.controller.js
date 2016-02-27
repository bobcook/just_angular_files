const SubscribeResourceModalController = function ($scope, dsoAuth, close) {
  'ngInject';

  $scope.close = close;
  $scope.dsoSubscribe = dsoAuth.dsoSubScribeAuth;
  $scope.login = dsoAuth.login;
  this.sayHi = function () {
    console.log('hello!');
  }
};

export default SubscribeResourceModalController;
