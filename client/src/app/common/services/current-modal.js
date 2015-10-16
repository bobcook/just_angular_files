const $currentModal = function ($rootScope) {
  'ngInject';

  return {
    close: function () {
      $rootScope.$broadcast('closeModal');
    },
  };
};

export default $currentModal;
