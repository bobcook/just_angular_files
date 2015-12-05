const resultIndexChart = function () {
  'ngInject';

  return {
    controller: 'ResultIndexController',
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'app/components/charts/result-index.html',
    restrict: 'E',
    scope: {
      index: '=',
      score: '=',
    },
  };
};

export default resultIndexChart;
