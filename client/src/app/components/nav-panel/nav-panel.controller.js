const NavPanelController = function (ApiRoutes, $assessmentsAuth) {
  'ngInject';

  this.loginUrl = `${ApiRoutes.AARP_AUTH}?promo=SM-SS`;
  this.currentRoute = 'root';
};

export default NavPanelController;
