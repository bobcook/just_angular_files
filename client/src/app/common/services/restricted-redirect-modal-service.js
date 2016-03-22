const restrictedRedirectModalService = function ($stateParams,
                                                 $location,
                                                 ModalService,
                                                 dsoModalService) {
  'ngInject';


  const showModal = function () {
    const resource = $stateParams.restrictedRedirect;
    if (resource) {
      dsoModalService.showSubscribeModal(resource);
    }
    $location.search('restrictedRedirect', null);
  };

  return {
    showModal: showModal,
  };
};

export default restrictedRedirectModalService;
