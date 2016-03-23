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
    return registerResources.includes(resource);
  };

  $scope.close = close;

  $scope.registerUrl = dsoAuth.dsoRegisterAuth(resourcePath);
  $scope.subscribeUrl = dsoAuth.dsoSubscribeAuth(resourcePath);

};

export default DsoGenericMocalController;
