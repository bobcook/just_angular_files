var navPanel = function () {
  return {
    controller: 'NavPanelController',
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'app/components/nav-panel/nav-panel.html',
    restrict: 'E',
    scope: {
      close: '&onClose',
    },
  };
};

export default navPanel;
