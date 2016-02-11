const currentNeuroResultsChart = function ($timeout, $windowResize) {
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

        // When chart is initially loaded, sizes are off -- want them
        // to be consistently the same size as when resizing the page.
        // See https://github.com/pablojim/highcharts-ng/issues/300
        $timeout(setChartSize, 0);
      };

      const setChartSize = function () {
        scope.vm.chart.setSize(439, 439);
      };

      scope.$watch('vm.neuroResults', updateChartConfig);

      // This gets around a bug where chart heights grow indefinitely
      // as page is resized
      $windowResize.bind(setChartSize);
    },
  };
};

export default currentNeuroResultsChart;
