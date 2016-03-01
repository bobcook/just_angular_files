const NavPanelController = function ($rootScope,
  AssessmentStatus,
  dsoModalService,
  dsoAuth) {
  'ngInject';

  this.showSubscribeModal = dsoModalService.show;

  this.login = dsoAuth.login;

  this.currentRoute = 'root';
  this.accountUrl = window.__env.accountUrl;

  if ($rootScope.$currentUser.isLoggedIn) {
    AssessmentStatus.hasCompletedAssessments().then((completed) => {
      this.hasCompletedAssessments = completed;
    });
  }
};

export default NavPanelController;
