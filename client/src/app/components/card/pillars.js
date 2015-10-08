const cardPillars = function () {
  return {
    controller: function () { },
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'app/components/card/pillars.html',
    restrict: 'A',
    scope: {
      pillars: '=ssCardPillars',
    },
  };
};

export default cardPillars;
