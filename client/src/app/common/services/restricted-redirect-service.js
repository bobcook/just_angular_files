const restrictedRedirectService = function ($state, $rootScope, $location) {
  'ngInject';

  const unpaidUser = () => $rootScope.$currentUser.membershipStatus !== 'paid';

  const anonymousUser = () => !$rootScope.$currentUser;

  const redirect = function redirect(clause, redirectPath, resource) {
    if (clause()) {
      $state.go(redirectPath, { restrictedRedirect: resource });
    }
  };

  const redirectGeneric = function redirect(clause,
                                            redirectPath,
                                            resource,
                                            resourcePath) {
    if (clause()) {
      $state.go(
        redirectPath,
        {
          restrictedRedirect: resource,
          genericRedirect: resourcePath,
        }
      );
    }
  };

  const filterUnpaidUsers = function filterUnpaidUsers(resource, resourcePath){
    if (resourcePath) {
      redirectGeneric(unpaidUser, 'application.home', resource, resourcePath);
    } else {
      redirect(unpaidUser, 'application.home', resource);
    }
  };

  const filterAnonymous = function filterAnonymous(resource, resourcePath){
    if (resourcePath) {
      redirectGeneric(anonymousUser,'application.home',resource,resourcePath);
    } else {
      redirect(anonymousUser, 'application.home', resource);
    };
  };

  return {
    redirect: redirect,
    filterUnpaidUsers: filterUnpaidUsers,
    filterAnonymous: filterAnonymous,
  };
};

export default restrictedRedirectService;
