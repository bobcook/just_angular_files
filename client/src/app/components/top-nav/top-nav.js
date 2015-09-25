var topNav = function() {
  return {
    bindToController: true,
    controllerAs: 'vm',
    restrict: 'E',
    templateUrl: 'app/components/top-nav/top-nav.html',
    scope: {},
    controller: 'TopNavController',
  };
};

export default topNav;
