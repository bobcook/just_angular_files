const restrictedRedirectService = function ($state, $rootScope, $location) {
  'ngInject';

  const unpaidUser = () => $rootScope.$currentUser.membershipStatus !== 'paid';

  const anonymousUser = () => !$rootScope.$currentUser;

  const redirect = function redirect(clause,
                                     redirectPath,
                                     resource,
                                     resourcePath,
                                     generic) {
    if (clause()) {
      $state.go(
        redirectPath,
        {
          restrictedRedirect: resource,
          resourcePath: resourcePath,
          genericRedirect: generic,
        }
      );
    }
  };

  const filterUnpaidUsers = function filterUnpaidUsers(resource,
                                                       resourcePath,
                                                       generic = null){
    redirect(unpaidUser, 'application.home', resource, resourcePath, generic);
  };

  const filterAnonymous =
    function filterAnonymous(resource,
                             resourcePath = $location.path(),
                             generic = null){
      redirect(anonymousUser,
               'application.home',
               resource,
               resourcePath,
               generic);
    };

  return {
    redirect: redirect,
    filterUnpaidUsers: filterUnpaidUsers,
    filterAnonymous: filterAnonymous,
  };
};

export default restrictedRedirectService;
