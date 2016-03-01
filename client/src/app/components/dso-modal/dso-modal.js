const dsoModal = function () {
  return {
    templateUrl: 'app/components/dso-modal/dso-modal.html',
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

export default dsoModal;
