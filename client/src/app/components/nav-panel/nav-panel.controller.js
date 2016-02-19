const NavPanelController = function ($rootScope,
                                     ApiRoutes,
                                     AssessmentStatus,
                                     dsoAuth) {
  'ngInject';

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
