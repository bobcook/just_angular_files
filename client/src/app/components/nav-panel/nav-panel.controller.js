const NavPanelController = function (ApiRoutes, $assessmentsAuth) {
  'ngInject';

  this.loginUrl = ApiRoutes.AARP_AUTH;
  this.currentRoute = 'root';
  this.authForAssessments = function () {
    $assessmentsAuth.authenticate();
  };
};

export default NavPanelController;
