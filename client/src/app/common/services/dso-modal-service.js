const dsoModalService = function ($window, ModalService, dsoAuth) {
  'ngInject';

  const showRegisterModal = function (resource) {
    ModalService.showModal({
      templateUrl: 'app/components/dso-modal/dso-modal.html',
      controller: 'DsoModalController',
      inputs: {
        resource: resource,
        authFunction: dsoAuth.login,
      },
    });
  };

  const showSubscribeModal = function (resource) {
    ModalService.showModal({
      templateUrl: 'app/components/dso-modal/dso-modal.html',
      controller: 'DsoModalController',
      inputs: {
        resource: resource,
        authFunction: subscribe,
      },
    });
  };

  const subscribe = function () {
    $window.location.href = dsoAuth.dsoSubscribeAuth();
  };

  return {
    showRegisterModal: showRegisterModal,
    showSubscribeModal: showSubscribeModal,
  };
};

export default dsoModalService;
