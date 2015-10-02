var sideNav = function($animate) {
  'ngInject';

  return {
    restrict: 'E',
    scope: {
      isOpen: '=',
    },
    link: function (scope, element, attrs) {
      const wrapper = $('<div class="side-nav-container"></div>')
        .appendTo(document.body)
        .append($(element).detach());

      scope.$watch('isOpen', function (isOpen) {
        if (isOpen) {
          $animate.addClass(element, 'side-nav-open');
        } else {
          $animate.removeClass(element, 'side-nav-open');
        }
      });

      scope.$on('$destroy', function () {
        wrapper.remove();
      });
    },
  };
};

export default sideNav;
