const cards = function () {
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
    },
  };
};

export default cards;
