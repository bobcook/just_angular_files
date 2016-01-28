const userDashboardCard = function () {
  return {
    controller: 'UserDashboardCardController',
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'app/components/user-dashboard-cards/user-dashboard-card.html',
    restrict: 'E',
    replace: true,
    scope: {
      card: '=ssCardFor',
      cardClasses: '=ssCardClasses',
      items: '=ssItems',
    },
  };
};

export default userDashboardCard;
