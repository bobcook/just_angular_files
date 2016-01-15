const card = function () {
  return {
    controller: 'CardController',
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'app/components/card/card.html',
    restrict: 'E',
    replace: true,
    scope: {
      card: '=ssCardFor',
      cardClasses: '=ssCardClasses',
      isUserNamespace: '=ssIsUserNamespace',
      items: '=ssItems',
      lastItem: '=ssLastItem',
      resource: '=ssResource',
    },
  };
};

export default card;
