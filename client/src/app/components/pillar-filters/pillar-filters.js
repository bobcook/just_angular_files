const pillarFilters = function () {
  return {
    restrict: 'E',
    templateUrl: 'app/components/pillar-filters/pillar-filters.html',
    controller: 'PillarFiltersController',
    controllerAs: 'vm',
    bindToController: true,
    scope: {
      selectedPillar: '=ssSelectedPillar',
    },
  };
};

export default pillarFilters;
