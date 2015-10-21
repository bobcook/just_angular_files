const Pillar = function (API_URL, railsResourceFactory) {
  'ngInject';

  const pillarsURL = `${API_URL}/api/v1/pillars`;

  const Pillar = railsResourceFactory({
    name: 'pillar',
    url: `${pillarsURL}/{{id}}`,
    httpConfig: {
      cache: true,
    },
  });

  return Pillar;
};

export default Pillar;
