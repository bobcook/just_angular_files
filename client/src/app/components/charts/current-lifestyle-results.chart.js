const currentLifestyleResultsChart = function ($timeout, $windowResize) {
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

        // When chart is initially loaded, sizes are off -- want them
        // to be consistently the same size as when resizing the page.
        // See https://github.com/pablojim/highcharts-ng/issues/300
        $timeout(setChartSize, 0);
      };

      const setChartSize = function () {
        scope.vm.chart.setSize(439, 439);
      };

      scope.$watch('vm.lifestyleResults', updateChartConfig);

      // This gets around a bug where chart heights grow indefinitely
      // as page is resized
      $windowResize.bind(setChartSize);
    },
  };
};

export default currentLifestyleResultsChart;
