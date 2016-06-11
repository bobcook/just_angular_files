const restrictedRedirectService = function ($state,
                                            $rootScope,
                                            $location,
                                            dsoModalService) {
  'ngInject';

  const unpaidUser = () => $rootScope.$currentUser.membershipStatus !== 'paid';

  const anonymousUser = () => !$rootScope.$currentUser;

  const showModalToAnonymousUsers = (resource,
                                     resourcePath = $location.path(),
                                     generic = null) => {
    if (anonymousUser()) {
      displayModal(resource, resourcePath, generic);
    }
  };

  const showModalToUnpaidUsers = (resource, resourcePath, generic) => {
    if (unpaidUser()) {
      displayModal(resource, resourcePath, generic);
    }
  };

  const displayModal = (resource, resourcePath, generic) => {
    if (generic) {
      dsoModalService.showGenericPaywallModal(resource, resourcePath);
    } else {
      dsoModalService.showSubscribeModal(resource, resourcePath);
    }
  };

  return {
    showModalToUnpaidUsers: showModalToUnpaidUsers,
    showModalToAnonymousUsers: showModalToAnonymousUsers,
  };
};

export default restrictedRedirectService;
