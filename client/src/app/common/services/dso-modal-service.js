const dsoModalService = function ($window, ModalService, dsoAuth, $location) {
  'ngInject';

  const showRegisterModal = function (resource,
                                      guard = () => false,
                                      redirectPath = $location.path()) {
    if (guard()) { return; }

    ModalService.showModal({
      templateUrl: 'app/components/dso-modal/dso-modal.html',
      controller: 'DsoModalController',
      inputs: {
        resource: resource,
        authFunction: register,
        redirectPath: redirectPath,
      },
    });

    clearPath();
  };

  const showSubscribeModal = function (resource,
                                       redirectPath = $location.path(),
                                       guard = () => false) {
    if (guard()) { return; }

    ModalService.showModal({
      templateUrl: 'app/components/dso-modal/dso-modal.html',
      controller: 'DsoModalController',
      inputs: {
        resource: resource,
        authFunction: subscribe,
        redirectPath: redirectPath,
      },
    });

    clearPath();
  };

  const showGenericPaywallModal = function (resource,
                                            resourcePath,
                                            guard = () => false) {
    if (guard()) { return; }

    ModalService.showModal({
      templateUrl: 'app/components/dso-modal/dso-generic-modal.html',
      controller: 'DsoGenericMocalController',
      inputs: {
        resource: resource,
        resourcePath: resourcePath,
      },
    });
  };

  const clearPath = () => $location.search('restrictedRedirect', null);

  const subscribe = function (redirectPath = $location.path()) {
    $window.location.href = dsoAuth.dsoSubscribeAuth(redirectPath);
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
