const UpdateMetaController = function ($scope, envName) {
  'ngInject';

  $scope.$watch('vm.robots', (newValue, oldValue) => {
    this.robotsVal = envName === 'production'
      ? newValue : 'noindex, nofollow';
  });
};

export default UpdateMetaController;
