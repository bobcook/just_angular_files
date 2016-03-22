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
  this.billingUrl = dsoAuth.dsoBillingPath();

  this.isUserWithBilling = function () {
    return $rootScope.$currentUser &&
      (
        $rootScope.$currentUser.isPaid() &&
        !$rootScope.$currentUser.isBetaUser() &&
        !$rootScope.$currentUser.isEmployeeUser()
      );
  };

  if ($rootScope.$currentUser.isLoggedIn) {
    AssessmentStatus.hasCompletedAssessments().then((completed) => {
      this.hasCompletedAssessments = completed;
    });
  }
};

export default NavPanelController;
