const NavPanelController = function (ApiRoutes) {
  this.currentRoute = 'root';
  this.assessmentsLoginURL = ApiRoutes.ASSESSMENTS_AUTH;
};

export default NavPanelController;
