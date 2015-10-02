const modalStateHelper = function () {
  const modalStateHelper = function (options) {
    let closeModal = null;
    const newOptions = _.omit(options, 'controller', 'onEnter', 'onExit');

    return _.merge(newOptions, {
      onEnter: function ($q, $state, ModalService) {
        'ngInject';

        ModalService.showModal({
          templateUrl: options.templateUrl,

          controller: function (close, $scope, $element, $controller) {
            'ngInject';

            if (options.controller != null) {
              $controller(options.controller, { $scope: $scope });
            }
            closeModal = close;
          },
        });
      },
      onExit: closeModal,
    });
  };

  modalStateHelper.$get = () => modalStateHelper;

  return modalStateHelper;
};

export default modalStateHelper;
