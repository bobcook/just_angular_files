const restrictedRedirectModalService = function ($stateParams,
                                                 $location,
                                                 ModalService,
                                                 dsoModalService) {
  'ngInject';

  const showModal = function () {
    const resource = $stateParams.restrictedRedirect;
    const genericRedirect = !!$stateParams.genericRedirect;
    const resourcePath = $stateParams.resourcePath;
    if (genericRedirect && resource) {
      dsoModalService.showGenericPaywallModal(resource, resourcePath);
    } else if (resource) {
      dsoModalService.showSubscribeModal(resource, resourcePath);
    }
    clearPath();
  };

  const clearPath = function () {
    $location.search('restrictedRedirect', null);
    $location.search('genericRedirect', null);
    $location.search('resourcePath', null);
  };

  return {
    showModal: showModal,
  };
};

export default restrictedRedirectModalService;
