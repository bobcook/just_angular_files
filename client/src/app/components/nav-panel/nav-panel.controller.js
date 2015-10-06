const NavPanelController = function (ApiRoutes) {
  'ngInject';

  this.currentRoute = 'root';
  this.assessmentsLoginURL = ApiRoutes.ASSESSMENTS_AUTH;
};

export default NavPanelController;
