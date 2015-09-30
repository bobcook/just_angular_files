var modalStateHelper = function () {
  var modalStateHelper = function(options) {
    var closeModal = null;
    var newOptions = _.omit(options, 'controller', 'onEnter', 'onExit');

    return _.merge(newOptions, {
      onEnter: function($q, $state, ModalService) {
        'ngInject';

        ModalService.showModal({
          templateUrl: options.templateUrl,

          controller: function(close, $scope, $element, $controller) {
            'ngInject';

            if (options.controller != null) {
              $controller(options.controller, { $scope: $scope });
            }
            closeModal = close;
          },
        });
      },
      onExit: function() {
        closeModal();
      },
    });
  };

  modalStateHelper.$get = function() {
    return modalStateHelper;
  };

  return modalStateHelper;
};

export default modalStateHelper;
