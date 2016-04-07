const modalStateHelper = function () {
  const modalStateHelper = function (options) {
    let closeModal = null;
    const newOptions =
      _.omit(options, 'controller', 'controllerAs', 'onEnter', 'onExit');

    return _.merge(newOptions, {
      onEnter: function ($q, $state, ModalService) {
        'ngInject';

        ModalService.showModal({
          templateUrl: options.templateUrl,

          controller: function (close, $scope, $element, $controller) {
            'ngInject';

            if (options.controller != null) {
              let controllerString = options.controller;
              if ('controllerAs' in options) {
                controllerString += ' as ' + options.controllerAs;
              }
              $controller(controllerString, { $scope: $scope });
            }
            closeModal = close;
          },
        });
      },
      onExit: ($state, $timeout) => {
        'ngInject';
        if (options.onExit) {
          options.onExit($state, $timeout);
        }
        closeModal();
      },
    });
  };

  modalStateHelper.$get = () => modalStateHelper;

  return modalStateHelper;
};

export default modalStateHelper;
