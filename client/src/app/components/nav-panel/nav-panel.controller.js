const NavPanelController = function (ApiRoutes, $assessmentsAuth) {
  'ngInject';

  this.currentRoute = 'root';
  this.authForAssessments = function () {
    $assessmentsAuth.authenticate();
  };
};

export default NavPanelController;
