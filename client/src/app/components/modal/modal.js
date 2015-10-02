var modal = function($state) {
  'ngInject';

  let KEYCODE_ESCAPE = 27;

  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'app/components/modal/modal.html',
    link: function (scope, element, attrs) {
      let modalElement = $(element).children('.modal');

      let containerContainsEvent = function(container, event) {
        return $(container).is(event.target)
            || $(container).has(event.target).length > 0;
      };

      let mouseUp = function(event) {
        if (!containerContainsEvent(modalElement, event)) {
          $state.go('^');
          removeListeners();
        }
      };

      let keyUp = function(event) {
        if (event.keyCode === KEYCODE_ESCAPE) {
          $state.go('^');
          removeListeners();
        }
      };

      let removeListeners = function () {
        $(document).off('mouseup', mouseUp);
        $(document).off('keyup', keyUp);
      };

      $(document).on('mouseup', mouseUp);
      $(document).on('keyup', keyUp);

      scope.$on('$destroy', removeListeners);
    },
  };
};

export default modal;
