const DsoModalController = function ($scope,
                                     $location,
                                     dsoAuth,
                                     resource,
                                     authFunction,
                                     redirectPath,
                                     close) {
  'ngInject';

  $scope.close = close;
  $scope.login = dsoAuth.login;
  $scope.registerUrl = dsoAuth.dsoRegisterAuth();
  $scope.buttonText = `subscribe_modal.${resource}.button_text`;
  $scope.bodyText = `subscribe_modal.${resource}.body_text`;
  $scope.authFunction = authFunction;
  $scope.redirectPath = redirectPath;
};

export default DsoModalController;
