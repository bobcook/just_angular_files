const currentLifestyleResultsChart = function () {
  'ngInject';

  return {
    controller: 'CurrentLifestyleResultsController',
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'app/components/charts/current-lifestyle-results.html',
    restrict: 'E',
    scope: {
      lifestyleResults: '=ssLifestyleResults',
    },
    link: function (scope, element, attrs) {
      const updateChartConfig = function (newLifestyleResults) {
        scope.vm.updateChartConfig(newLifestyleResults);
      };

      scope.$watch('vm.lifestyleResults', updateChartConfig);
    },
  };
};

export default currentLifestyleResultsChart;
