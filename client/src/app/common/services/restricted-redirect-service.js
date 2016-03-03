const restrictedRedirectService = function ($state, $rootScope) {
  'ngInject';

  const check = function check(){
    if ($rootScope.$currentUser.membershipStatus !== 'paid') {
      $state.go('application.home', { restrictedRedirect: true });
    }
  };

  return {
    check: check,
  };
};

export default restrictedRedirectService;
