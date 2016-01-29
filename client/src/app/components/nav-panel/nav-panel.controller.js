const NavPanelController = function (ApiRoutes, AssessmentStatus, $rootScope) {
  'ngInject';

  this.loginUrl = `${ApiRoutes.AARP_AUTH}?promo=SM-SS`;
  this.currentRoute = 'root';
  this.accountUrl = window.__env.accountUrl;

  if ($rootScope.$currentUser.isLoggedIn) {
    AssessmentStatus.hasCompletedAssessments().then((completed) => {
      this.hasCompletedAssessments = completed;
    });
  }
};

export default NavPanelController;
