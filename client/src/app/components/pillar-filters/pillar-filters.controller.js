const PillarFiltersController = function (Pillar,
                                          $pillarFiltering) {
  'ngInject';

  this.setSelectedPillar = (pillarSlug) => {
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
