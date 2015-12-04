const currentNeuroResultsChart = function () {
  'ngInject';

  return {
    controller: 'CurrentNeuroResultsController',
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'app/components/charts/current-neuro-results.html',
    restrict: 'E',
    scope: {
      neuroResults: '=ssNeuroResults',
    },
    link: function (scope, element, attrs) {
      const updateChartConfig = function (newNeuroResults) {
        scope.vm.updateChartConfig(newNeuroResults);
      };

      scope.$watch('vm.neuroResults', updateChartConfig);
    },
  };
};

export default currentNeuroResultsChart;
