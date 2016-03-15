const restrictedRedirectModalService = function ($stateParams,
                                                 $location,
                                                 ModalService) {
  'ngInject';

  const isRestrictedRedirect = () => $stateParams.restrictedRedirect === 'true';

  const showModal = function () {
    if (isRestrictedRedirect()) {
      ModalService.showModal({
        templateUrl: 'app/home/restricted-redirect-modal.html',
        controller: 'RestrictedRedirectContoller',
      });
    }
    $location.search('restrictedRedirect', null);
  };

  return {
    showModal: showModal,
  };
};

export default restrictedRedirectModalService;
