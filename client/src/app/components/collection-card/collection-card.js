const collectionCard = function () {
  'ngInject';

  return {
    controller: 'CollectionCardController',
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'app/components/collection-card/collection-card.html',
    restrict: 'E',
    scope: {
      collection: '=ssCollection',
      resource: '=ssResource',
    },
  };
};

export default collectionCard;
