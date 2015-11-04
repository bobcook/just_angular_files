const NavPanelController = function (ApiRoutes, $assessmentsAuth) {
  'ngInject';

  this.loginUrl = ApiRoutes.AARP_AUTH;
  this.currentRoute = 'root';
};

export default NavPanelController;
