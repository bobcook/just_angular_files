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
    return /beta/i.test(this.membershipProduct);
  };

  const isEmployeeUser = function () {
    return /employee/i.test(this.membershipProduct);
  };

  const isPaid = function () {
    return this.membershipStatus === 'paid';
  };

  const isRegistered = function () {
    return this.membershipStatus === 'prospect';
  };

  const daysToExpire = function () {
    const today = moment().utc().startOf('day');
    const exp = moment(this.membershipExpiration).utc();
    return exp.diff(today, 'days');
  };

  CurrentUser.include({
    isBetaUser: isBetaUser,
    isEmployeeUser: isEmployeeUser,
    isPaid: isPaid,
    isRegistered: isRegistered,
    daysToExpire: daysToExpire,
  });

  return CurrentUser;
};

export default CurrentUser;
