const dsoModalService = function (ModalService) {
  'ngInject';

  const show = function (resource) {
    ModalService.showModal({
      templateUrl: `app/${resource}/subscribe-modal.html`,
      controller: 'DsoModalController',
    });
  };

  return {
    show: show,
  };
};

export default dsoModalService;
