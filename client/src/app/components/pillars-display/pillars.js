const pillarsDisplay = function () {
  return {
    controller: function () { },
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'app/components/pillars-display/pillars.html',
    restrict: 'A',
    scope: {
      pillars: '=ssPillarsDisplay',
    },
  };
};

export default pillarsDisplay;
