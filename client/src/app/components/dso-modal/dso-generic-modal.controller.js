const DsoGenericMocalController = function ($state,
                                            $scope,
                                            dsoAuth,
                                            resource,
                                            resourcePath,
                                            close) {
  'ngInject';

  const registerResources = ['assessment'];

  $scope.redirectPath = resourcePath;

  $scope.forRegister = function () {
    return _.includes(registerResources, resource);
  };

  $scope.close = () => {
    close();
    $state.go('application.home');
  };

  $scope.login = dsoAuth.login;

  $scope.registerUrl = dsoAuth.dsoRegisterAuth(resourcePath);
  $scope.subscribeUrl = dsoAuth.dsoSubscribeAuth(resourcePath);

};

export default DsoGenericMocalController;
