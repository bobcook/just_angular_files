const restrictedRedirectService = function ($state, $rootScope, $location) {
  'ngInject';

  const unpaidUser = () => $rootScope.$currentUser.membershipStatus !== 'paid';

  const anonymousUser = () => !$rootScope.$currentUser;

  const redirect = function redirect(clause, redirectPath) {
    if (clause()) {
      $state.go(redirectPath, { restrictedRedirect: true });
    }
  };

  const filterUnpaidUsers =
    function filterUnpaidUsers(redirectPath = 'application.home'){
      redirect(unpaidUser, redirectPath);
    };

  const filterAnonymous =
    function filterAnonymous(redirectPath = 'application.home'){
      redirect(anonymousUser, redirectPath);
    };

  return {
    redirect: redirect,
    filterUnpaidUsers: filterUnpaidUsers,
    filterAnonymous: filterAnonymous,
  };
};

export default restrictedRedirectService;
