const $loadCurrentUser = function (CurrentUser, $rootScope) {
  'ngInject';

  const setUserOnRootScope = function (user) {
    $rootScope.$currentUser = user;
    if (user) {
      $rootScope.$currentUser.updateLastSeenAt();
    }

    return user;
  };

  return function (user) {
    // when user attemps to logs in, $rootScope.$currentUser set to '' (falsey).
    // update $rootScope.$currentUser after user logs in.
    if (user) {
      return user.get().then(setUserOnRootScope);
    } else {
      return CurrentUser.query().then(setUserOnRootScope);
    }
  };
};

export default $loadCurrentUser;
