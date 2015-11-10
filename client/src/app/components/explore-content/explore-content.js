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
    link: function (scope, element, attrs) {
      const setShownItems = function () {
        $pillarFiltering
          .filterMixedContentByPillar(scope.vm.selectedPillar, scope.vm.items)
          .then((filteredItems) => {
            scope.vm.setShownItems(filteredItems);
          });
      };

      scope.$watch('vm.selectedPillar', setShownItems);
      scope.$watch('vm.items', setShownItems);
    },
  };
};

export default exploreContent;
