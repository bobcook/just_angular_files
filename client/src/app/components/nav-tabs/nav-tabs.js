const navTabs = function () {
  return {
    bindToController: true,
    controllerAs: 'vm',
    restrict: 'E',
    templateUrl: 'app/components/nav-tabs/nav-tabs.html',
    scope: {},
    controller: 'NavTabsController',
  };
};

export default navTabs;
