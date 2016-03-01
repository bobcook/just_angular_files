const DsoModalController = function ($scope,
                                     dsoAuth,
                                     resource,
                                     authFunction,
                                     close) {
  'ngInject';

  $scope.close = close;
  $scope.login = dsoAuth.login;
  $scope.buttonText = `subscribe_modal.${resource}.button_text`;
  $scope.bodyText = `subscribe_modal.${resource}.body_text`;
  $scope.authFunction = authFunction;
};

export default DsoModalController;
