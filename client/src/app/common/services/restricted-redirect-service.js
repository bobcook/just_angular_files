const restrictedRedirectService = function ($state, $rootScope, $location) {
  'ngInject';

  const unpaidUser = () => $rootScope.$currentUser.membershipStatus !== 'paid';

  const anonymousUser = () => !$rootScope.$currentUser;

  const redirect = function redirect(clause, redirectPath, resource) {
    if (clause()) {
      $state.go(redirectPath, { restrictedRedirect: resource });
    }
  };

  const filterUnpaidUsers =
    function filterUnpaidUsers(resource){
      redirect(unpaidUser, 'application.home', resource);
    };

  const filterAnonymous =
    function filterAnonymous(resource){
      redirect(anonymousUser, 'application.home', resource);
    };

  return {
    redirect: redirect,
    filterUnpaidUsers: filterUnpaidUsers,
    filterAnonymous: filterAnonymous,
  };
};

export default restrictedRedirectService;
