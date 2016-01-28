const userDashboardCards = function () {
  'ngInject';

  return {
    controller: 'UserDashboardCardsController',
    controllerAs: 'vm',
    bindToController: true,
    templateUrl:
      'app/components/user-dashboard-cards/user-dashboard-cards.html',
    restrict: 'E',
    scope: {
      cardClasses: '@ssCardClasses',
      perPage: '=ssPerPage',
      perRow: '=ssPerRow',
      items: '=ssItems',
      resource: '=ssResource',
    },
    link: function (scope, element, attrs) {
      const setShownItems = function () {
        scope.vm.setShownItems(scope.vm.items);
      };

      scope.$watch('vm.items', setShownItems);
    },
  };
};

export default userDashboardCards;
