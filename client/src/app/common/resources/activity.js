const Activity = function (API_URL, railsResourceFactory) {
  'ngInject';

  const Activity = railsResourceFactory({
    name: 'activity',
    url: `${API_URL}/api/v1/activities/{{id}}`,
  });

  return Activity;
};

export default Activity;
