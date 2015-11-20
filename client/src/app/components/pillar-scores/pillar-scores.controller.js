const PillarScoresController = function (Pillar) {
  'ngInject';

  Pillar.query().then((response) => {
    this.pillars = response;
  });
};

export default PillarScoresController;
