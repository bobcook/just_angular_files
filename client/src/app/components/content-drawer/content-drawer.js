const contentDrawer = function () {
  'ngInject';

  return {
    controllerAs: 'vm',
    templateUrl: 'app/components/content-drawer/content-drawer.html',
    transclude: true,
    replace: true,
    scope: {
      isOpen: '=ssContentDrawer',
      ssDrawerClass: '@?',
    },
    link: function (scope, element, attrs) {
      const elementInner = $(element).find('.content-drawer-inner');
      scope.$watch('isOpen', function (isOpen) {
        if (isOpen) {
          element
            .addClass('visible')
            .css({ height: $(elementInner)[0].offsetHeight });
        } else {
          element
            .removeClass('visible')
            .css({ height: 0 });
        }
      });
    },
  };
};

export default contentDrawer;
