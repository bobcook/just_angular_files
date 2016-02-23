const subscribeModalService = function (ModalService) {
  'ngInject';

  const show = function (resource) {
    ModalService.showModal({
      templateUrl: `app/${resource}/subscribe-modal.html`,
      controller: 'SubscribeResourceModalController',
    });
  };

  return {
    show: show,
  };
};

export default subscribeModalService;
