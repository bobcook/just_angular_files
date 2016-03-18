const NavPanelController = function ($rootScope,
  AssessmentStatus,
  dsoModalService,
  dsoAuth) {
  'ngInject';

  this.showSubscribeModal = dsoModalService.showSubscribeModal;

  this.login = dsoAuth.login;

  this.subscribeGuard = function () { return false; };

  this.subscribeUrl = dsoAuth.dsoSubscribeAuth();

  this.currentRoute = 'root';
  this.accountUrl = window.__env.accountUrl;

  if ($rootScope.$currentUser.isLoggedIn) {
    AssessmentStatus.hasCompletedAssessments().then((completed) => {
      this.hasCompletedAssessments = completed;
    });
  }
};

export default NavPanelController;
