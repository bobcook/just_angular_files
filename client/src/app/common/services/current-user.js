const $currentUser = function ($auth) {
  'ngInject';

  return {
    get isLoggedIn() {
      return $auth.sessionExists();
    },
  };
};

export default $currentUser;
