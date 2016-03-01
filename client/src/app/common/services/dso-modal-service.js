const dsoModalService = function (ModalService, dsoAuth) {
  'ngInject';

  const showRegisterModal = function (resource) {
    ModalService.showModal({
      templateUrl: 'app/components/dso-modal/dso-modal.html',
      controller: 'DsoModalController',
      inputs: {
        resource: resource,
        authFuction: dsoAuth.login,
      },
    });
  };

  const showSubscribeModal = function (resource) {
    ModalService.showModal({
      templateUrl: 'app/components/dso-modal/dso-modal.html',
      controller: 'DsoModalController',
      inputs: {
        resource: resource,
        authFunction: dsoAuth.subscribe,
      },
    });
  };

  return {
    showRegisterModal: showRegisterModal,
    showSubscribeModal: showSubscribeModal,
  };
};

export default dsoModalService;
