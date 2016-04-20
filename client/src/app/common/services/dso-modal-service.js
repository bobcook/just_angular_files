const dsoModalService = function ($window, ModalService, dsoAuth, $location) {
  'ngInject';

  const showRegisterModal = function (resource,
                                      guard = () => false,
                                      redirectPath = $location.path(),
                                      intcmp = null) {
    if (guard()) { return; }

    ModalService.showModal({
      templateUrl: 'app/components/dso-modal/dso-modal.html',
      controller: 'DsoModalController',
      inputs: {
        resource: resource,
        authFunction: register,
        redirectPath: redirectPath,
        intcmp: intcmp,
      },
    });

    clearPath();
  };

  const showSubscribeModal = function (resource,
                                       redirectPath = $location.path(),
                                       guard = () => false,
                                       intcmp = null) {
    if (guard()) { return; }

    ModalService.showModal({
      templateUrl: 'app/components/dso-modal/dso-modal.html',
      controller: 'DsoModalController',
      inputs: {
        resource: resource,
        authFunction: subscribe,
        redirectPath: redirectPath,
        intcmp: intcmp,
      },
    });

    clearPath();
  };

  const showGenericPaywallModal = function (resource,
                                            resourcePath,
                                            guard = () => false,
                                            intcmp = null) {
    if (guard()) { return; }

    ModalService.showModal({
      templateUrl: 'app/components/dso-modal/dso-generic-modal.html',
      controller: 'DsoGenericMocalController',
      inputs: {
        resource: resource,
        resourcePath: resourcePath,
        intcmp: intcmp,
      },
    });
  };

  const clearPath = () => $location.search('restrictedRedirect', null);

  const subscribe = function (redirectPath = $location.path(), intcmp = null) {
    $window.location.href = dsoAuth.dsoSubscribeAuth(redirectPath, intcmp);
  };

  const register = function (redirectPath = $location.path()) {
    $window.location.href = dsoAuth.dsoRegisterAuth(redirectPath);
  };

  return {
    showRegisterModal: showRegisterModal,
    showSubscribeModal: showSubscribeModal,
    showGenericPaywallModal: showGenericPaywallModal,
  };
};

export default dsoModalService;
