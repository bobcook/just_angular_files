const subscribeModal = function () {
  return {
    controller: 'SubscribeModalController',
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'app/components/subscribe-modal/subscribe-modal.html',
    restrict: 'E',
    replace: true,
    scope: {
      bodyText: '=ssBodyText',
      buttonText: '=ssButtonText',
      auth: '&ssAuth',
      close: '&ssCloseFn',
      login: '&ssLogin',
    },
  };
};

export default subscribeModal;
