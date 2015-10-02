var contentDrawer = function() {
  'ngInject';

  return {
    restrict: 'A',
    scope: {
      isOpen: '=ssContentDrawer',
      height: '=ssDrawerHeight',
    },
    link: function (scope, element, attrs) {
      $(element).wrap('<div class="content-drawer-wrapper"></div>');
      var wrapper = $(element).parent();
      scope.$watch('isOpen', function (isOpen) {
        if (isOpen) {
          wrapper.css({ height: scope.height });
        } else {
          wrapper.css({ height: 0 });
        }
      });
    },
  };
};

export default contentDrawer;
