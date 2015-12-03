const PillarFiltersController = function (Pillar,
                                          $pillarFiltering) {
  'ngInject';

  // Via ss-selectedPillar
  this.selectedPillar = this.selectedPillar || null;

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
    });
  };

  this.loadPillars();
};

export default PillarFiltersController;
