const pillarScores = function () {
  'ngInject';

  return {
    controller: 'PillarScoresController',
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'app/components/pillar-scores/pillar-scores.html',
    restrict: 'E',
    replace: true,
    scope: {
      items: '=ssItems',
    },
  };
};

export default pillarScores;
