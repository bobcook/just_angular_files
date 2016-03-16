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
        authFunction: dsoAuth.login,
        redirectPath: redirectPath,
      },
    });

    clearPath();
  };

  const showSubscribeModal = function (resource,
                                       guard = () => false,
                                       redirectPath = $location.path()) {
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

  const clearPath = () => $location.search('restrictedRedirect', null);

  const subscribe = function (redirectPath = $location.path()) {
    $window.location.href = dsoAuth.dsoSubscribeAuth(redirectPath);
  };

  return {
    showRegisterModal: showRegisterModal,
    showSubscribeModal: showSubscribeModal,
  };
};

export default dsoModalService;
