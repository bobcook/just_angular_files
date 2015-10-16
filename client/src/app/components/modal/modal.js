const modal = function ($state) {
  'ngInject';

  const KEYCODE_ESCAPE = 27;

  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'app/components/modal/modal.html',
    scope: {
      close: '&?onClose',
    },
    link: function (scope, element, attrs) {
      const modalElement = $(element).children('.modal');

      const containerContainsEvent = function (container, event) {
        return $(container).is(event.target)
            || $(container).has(event.target).length > 0;
      };

      const mouseUp = function (event) {
        if (!containerContainsEvent(modalElement, event)) {
          close();
          removeListeners();
        }
      };

      const keyUp = function (event) {
        if (event.keyCode === KEYCODE_ESCAPE) {
          close();
          removeListeners();
        }
      };

      const close = function () {
        if (scope.close) {
          scope.close();
        } else {
          $state.go('^');
        }
      };

      const removeListeners = function () {
        $(document).off('mouseup', mouseUp);
        $(document).off('keyup', keyUp);
      };

      $(document).on('mouseup', mouseUp);
      $(document).on('keyup', keyUp);

      scope.$on('$destroy', removeListeners);

      // Triggered by $currentModal.close()
      scope.$on('closeModal', close);
    },
  };
};

export default modal;
