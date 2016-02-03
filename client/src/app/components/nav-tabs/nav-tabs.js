const navTabs = function () {
  return {
    restrict: 'E',
    templateUrl: 'app/components/nav-tabs/nav-tabs.html',
    scope: {
      activeTab: '@',
    },
  };
};

export default navTabs;
