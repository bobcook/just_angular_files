const myFutureBrainChart = function () {
  'ngInject';

  return {
    controller: 'MyFutureBrainController',
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'app/components/charts/my-future-brain.html',
    restrict: 'E',
    scope: {
      neuroResults: '=ssNeuroResults',
    },
    link: function (scope, element, attrs) {
      const updateChartConfig = function (newNeuroResults, age) {
        scope.vm.updateChartConfig(newNeuroResults, age);
      };

      scope.$watch('vm.neuroResults', updateChartConfig);
    },
  };
};

export default myFutureBrainChart;
