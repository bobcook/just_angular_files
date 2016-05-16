const topNav = function ($rootScope) {
  'ngInject';

  return {
    bindToController: true,
    controllerAs: 'vm',
    restrict: 'E',
    templateUrl: 'app/components/top-nav/top-nav.html',
    scope: {},
    controller: 'TopNavController',
    link: function (scope, element, attrs) {
      const nav = element.find('.global-header');
      if (!$rootScope.$currentUser || $rootScope.$currentUser.isRegistered())
      {
        nav.attr('sticky', '');
      } else {
        nav.removeAttr('sticky');
      }

      nav.injector().invoke(function ($compile){
        'ngInject';
        $compile(nav)(scope);
      });
    },
  };
};

export default topNav;
