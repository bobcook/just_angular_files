const contentDrawer = function () {
  'ngInject';

  return {
    restrict: 'A',
    scope: {
      isOpen: '=ssContentDrawer',
      drawerClass: '@ssDrawerClass',
    },
    link: function (scope, element, attrs) {
      $(element).wrap(
        '<div class="content-drawer-wrapper '+scope.drawerClass+'"></div>'
      );
      const wrapper = $(element).parent();
      console.log();
      scope.$watch('isOpen', function (isOpen) {
        if (isOpen) {
          wrapper.css({ height: $(element)[0].offsetHeight });
        } else {
          wrapper.css({ height: 0 });
        }
      });
    },
  };
};

export default contentDrawer;
