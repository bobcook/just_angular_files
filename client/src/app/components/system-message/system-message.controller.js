const SystemMessageController = function ($state,
                                          $rootScope,
                                          dsoAuth,
                                          AssessmentStatus,
                                          assessmentStates) {
  'ngInject';

  const EXPIRATION_THRESHOLD = 21;

  this.isAnonymous = function () {
    return !$rootScope.$currentUser;
  };

  this.isNotStarted = function () {
    return this.assessmentState === assessmentStates.states.notStarted;
  };

  this.isStarted = function () {
    return this.assessmentState === assessmentStates.states.started;
  };

  this.isCompleted = function () {
    return this.assessmentState === assessmentStates.states.completed;
  };

  this.isExpiring = function () {
    return isExpiringSoon() && isExpiringProduct();
  };

  const isExpiringSoon = function () {
    return $rootScope.$currentUser.daysToExpire() <= EXPIRATION_THRESHOLD;
  };

  const isExpiringProduct = function () {
    const expiringProducts = [
      'Specialized Membership - $0 BETA',
    ];
    return expiringProducts
      .indexOf($rootScope.$currentUser.membershipProduct) > -1;
  };

  this.subscribeUrl =
    dsoAuth.dsoSubscribeAuth(
      $state.href('application.user.assessments.overall')
    );

  this.reSubscribeUrl =
    dsoAuth.dsoSubscribeAuth(
      $state.href('application.home'),
      'SSS-JOINSS-HEAD',
      'RENEW1',
      'SS-BETA'
    );

  this.showSystemMessage = () => {
    return !_.isUndefined(this.assessmentState) &&
      !_.isNull(this.assessmentState);
  };

  AssessmentStatus.lastUserAssessmentGroup().then((lastGroup) => {
    this.assessmentState = assessmentStates.getState(lastGroup);
  }, (err) => {
    if (err.status && err.status === 401) {
      this.assessmentState = assessmentStates.getState();
    }
  });
};

export default SystemMessageController;
