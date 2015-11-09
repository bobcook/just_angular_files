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
      const render = function (isOpen) {
        if (isOpen) {
          element.addClass('visible');
          element.show();
        } else {
          element.removeClass('visible');
          element.hide();
        }
      };

      scope.$watch('isOpen', render);
    },
  };
};

export default contentDrawer;
