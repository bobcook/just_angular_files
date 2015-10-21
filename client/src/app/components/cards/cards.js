const cards = function ($pillarFiltering) {
  'ngInject';

  return {
    controller: 'CardsController',
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'app/components/cards/cards.html',
    restrict: 'AE',
    scope: {
      resource: '=ssResource',
      perPage: '=ssPerPage',
      perRow: '=ssPerRow',
      cardClasses: '@ssCardClasses',
      parentResource: '=?ssParentResource',
      selectedPillar: '=ssSelectedPillar',
    },
    link: function (scope, element, attrs) {
      const setShownItems = function () {
        $pillarFiltering
          .filterByPillar(scope.vm.selectedPillar, scope.vm.items)
          .then((filteredItems) => {
            scope.vm.setShownItems(filteredItems);
          });
      };

      scope.$watch('vm.selectedPillar', setShownItems);
      scope.$watch('vm.items', setShownItems);
    },
  };
};

export default cards;
