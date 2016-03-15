const dsoModalService = function ($window, ModalService, dsoAuth, $location) {
  'ngInject';

  const showRegisterModal = function (resource, guard = () => false) {
    if (guard()) { return; }

    ModalService.showModal({
      templateUrl: 'app/components/dso-modal/dso-modal.html',
      controller: 'DsoModalController',
      inputs: {
        resource: resource,
        authFunction: dsoAuth.login,
      },
    });

    clearPath();
  };

  const showSubscribeModal = function (resource, guard = () => false) {
    if (guard()) { return; }

    ModalService.showModal({
      templateUrl: 'app/components/dso-modal/dso-modal.html',
      controller: 'DsoModalController',
      inputs: {
        resource: resource,
        authFunction: subscribe,
      },
    });

    clearPath();
  };

  const clearPath = () => $location.search('restrictedRedirect', null);

  const subscribe = function () {
    $window.location.href = dsoAuth.dsoSubscribeAuth();
  };

  return {
    showRegisterModal: showRegisterModal,
    showSubscribeModal: showSubscribeModal,
  };
};

export default dsoModalService;
