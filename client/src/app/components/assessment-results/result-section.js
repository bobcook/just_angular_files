const resultSection = function () {
  return {
    controller: 'ResultSectionController',
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'app/components/assessment-results/result-section.html',
    restrict: 'E',
    replace: true,
    scope: {
      categoryResult: '=ssCategoryResult',
    },
  };
};

export default resultSection;
