const NavPanelController = function($rootScope,
  AssessmentStatus,
  subscribeModalService,
  dsoAuth) {
  'ngInject';

  this.showSubscribeModal = subscribeModalService.show;

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