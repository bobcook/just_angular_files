const card = function () {
  return {
    controller: 'CardController',
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'app/components/card/card.html',
    restrict: 'E',
    scope: {
      card: '=ssCardFor',
      cardClasses: '=ssCardClasses',
    },
  };
};

export default card;
