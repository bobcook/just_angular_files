const CurrentUser = function (API_URL, railsResourceFactory, $auth, $cookies) {
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

  const isBetaUser = function () {
    return this.membershipProduct === 'beta';
  };

  const isEmployeeUser = function () {
    return this.membershipProduct === 'employee';
  };

  const isPaid = function () {
    return this.membershipStatus === 'paid';
  };

  CurrentUser.include({
    isBetaUser: isBetaUser,
    isEmployeeUser: isEmployeeUser,
    isPaid: isPaid,
  });

  return CurrentUser;
};

export default CurrentUser;
