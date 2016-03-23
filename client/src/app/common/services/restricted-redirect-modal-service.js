const restrictedRedirectModalService = function ($stateParams,
                                                 $location,
                                                 ModalService,
                                                 dsoModalService) {
  'ngInject';

  const showModal = function () {
    const resource = $stateParams.restrictedRedirect;
    const genericRedirect = $stateParams.genericRedirect;
    if (genericRedirect && resource) {
      dsoModalService.showGenericPaywallModal(resource, genericRedirect);
    } else if (resource) {
      dsoModalService.showSubscribeModal(resource);
    }
    $location.search('restrictedRedirect', null);
    $location.search('genericRedirect', null);
  };

  return {
    showModal: showModal,
  };
};

export default restrictedRedirectModalService;
