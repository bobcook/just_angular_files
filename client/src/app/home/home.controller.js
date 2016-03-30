const HomeController = function (AssessmentStatus,
                                 ExploreContent,
                                 $rootScope,
                                 $state,
                                 dsoAuth,
                                 restrictedRedirectModalService) {
  'ngInject';

  restrictedRedirectModalService.showModal();

  const currentUser = $rootScope.$currentUser;

  const setHasCompletedAssessments = () => {
    return AssessmentStatus.hasCompletedAssessments().then((result) => {
      this.hasCompletedAssessments = result;
    });
  };

  this.selectedPillar = null; // Will be overwritten by pillar filters
  this.resource = ExploreContent;

  // TODO: change once actual auth / permissions in place?
  //
  // Need to allow non-logged in users to see the homepage, but
  // hasCompletedAssessments is a restricted route
  if (currentUser.isLoggedIn) { setHasCompletedAssessments(); }
};

export default HomeController;
