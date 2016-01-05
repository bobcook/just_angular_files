const exploreContent = function ($pillarFiltering) {
  'ngInject';

  return {
    restrict: 'E',
    controller: 'ExploreContentController',
    controllerAs: 'vm',
    templateUrl: 'app/components/explore-content/explore-content.html',
    bindToController: true,
    scope: {
      resource: '=ssResource',
      selectedPillar: '=ssSelectedPillar',
    },
  };
};

export default exploreContent;
