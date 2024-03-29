const DsoModalController = function ($scope,
                                     $state,
                                     $location,
                                     dsoAuth,
                                     resource,
                                     authFunction,
                                     redirectPath,
                                     intcmp,
                                     close) {
  'ngInject';

  $scope.close = () => {
    close();
    $state.go('application.home');
  };

  $scope.login = dsoAuth.login;
  $scope.registerUrl = dsoAuth.dsoRegisterAuth();
  $scope.buttonText = `subscribe_modal.${resource}.button_text`;
  $scope.bodyText = `subscribe_modal.${resource}.body_text`;
  $scope.authFunction = authFunction;
  $scope.intcmp = intcmp;
  $scope.redirectPath = redirectPath;
  $scope.resource = resource;
};

export default DsoModalController;
