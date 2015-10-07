const NavPanelController = function (ApiRoutes, $auth) {
  'ngInject';

  this.currentRoute = 'root';
  this.assessmentsAuthURL = ApiRoutes.ASSESSMENTS_AUTH;
  this.sessionToken = $auth.sessionToken();
};

export default NavPanelController;
