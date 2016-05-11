const UpdateMetaController = function ($scope, envName) {
  'ngInject';

  $scope.$watch('vm.robots', () => {
    this.robotsVal = envName === 'production'
      ? this.robots : 'noindex, nofollow';
  });
};

export default UpdateMetaController;
