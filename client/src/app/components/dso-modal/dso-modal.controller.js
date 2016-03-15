const DsoModalController = function ($scope,
                                     $location,
                                     dsoAuth,
                                     resource,
                                     authFunction,
                                     close) {
  'ngInject';

  $scope.close = close;
  $scope.login = dsoAuth.login;
  $scope.registerUrl = dsoAuth.dsoRegister();
  $scope.buttonText = `subscribe_modal.${resource}.button_text`;
  $scope.bodyText = `subscribe_modal.${resource}.body_text`;
  $scope.authFunction = authFunction;
};

export default DsoModalController;
