const resourceUrlFormatter = function () {
  'ngInject';

  const format = function (resourceType, id, pillar, year) {
    return `application.${resourceType}` +
      `({ id: '${id}', pillar: '${pillar}', year: '${year}' })`;
  };

  return { format: format };
};

export default resourceUrlFormatter;
