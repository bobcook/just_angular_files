import cacheHelpers from '../../common/services/cache-helpers';

const PillarFiltersController = function (Pillar,
                                          $pillarFiltering,
                                          $location,
                                          CacheFactory) {
  'ngInject';

  this.setSelectedPillar = (pillarSlug) => {
    $location.hash('');

    if (this.resourceContentName) {
      cacheHelpers.bustCache(CacheFactory, this.resourceContentName);
    }

    $pillarFiltering.pillarBySlug(pillarSlug).then((pillar) => {
      this.selectedPillar = pillar || this.selectAll;
    });
  };

  this.loadPillars = () => {
    return $pillarFiltering.getPillarData().then((pillarData) => {
      this.pillars = pillarData.pillars;
      this.selectAll = pillarData.selectAll;
      this.otherPillars = pillarData.otherPillars;
      // Via ss-selectedPillar
      this.selectedPillar = this.selectedPillar || this.selectAll;
    });
  };

  this.loadPillars();
};

export default PillarFiltersController;
