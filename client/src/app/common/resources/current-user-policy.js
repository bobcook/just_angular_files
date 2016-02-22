const CurrentUserPolicy = function (API_URL, railsResourceFactory) {
  'ngInject';

  const CurrentUserPolicy = railsResourceFactory({
    name: 'currentUserPolicy',
    url: `${API_URL}/api/v1/policies/current_user`,
  });

  return CurrentUserPolicy;
};

export default CurrentUserPolicy;
