const cards = function ($pillarFiltering) {
  'ngInject';

  return {
    controller: 'CardsController',
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'app/components/cards/cards.html',
    restrict: 'AE',
    scope: {
      cardClasses: '@ssCardClasses',
      isUserNamespace: '=ssIsUserNamespace',
      perPage: '=ssPerPage',
      perRow: '=ssPerRow',
      resource: '=ssResource',
      selectedPillar: '=ssSelectedPillar',
      displayShowMore: '=?ssShowMore',
      items: '=?ssItems',
      useCollectionCard: '=?ssUseCollectionCard',
    },
  };
};

export default cards;
