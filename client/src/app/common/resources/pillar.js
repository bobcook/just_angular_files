const Pillar = function (API_URL, railsResourceFactory) {
  'ngInject';

  const pillarsURL = `${API_URL}/api/v1/pillars`;

  return railsResourceFactory({
    name: 'pillar',
    url: `${pillarsURL}/{{id}}`,
  });
};

export default Pillar;
