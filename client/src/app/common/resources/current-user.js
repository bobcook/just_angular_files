const CurrentUser = function (API_URL, railsResourceFactory, $auth) {
  'ngInject';

  const CurrentUser = railsResourceFactory({
    name: 'user',
    url: `${API_URL}/api/v1/me/current_user`,
  });

  Object.defineProperty(CurrentUser.prototype, 'isLoggedIn', {
    get: function () {
      return $auth.sessionExists();
    },
  });

  return CurrentUser;
};

export default CurrentUser;
