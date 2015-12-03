const HomeController = function (ExploreContent,
                                 AssessmentStatus) {
  'ngInject';

  AssessmentStatus.hasCompletedAssessments().then((result) => {
    this.hasCompletedAssessments = result;
  });

 // pass values to directive
  this.selectedPillar = null; // Will be overwritten by pillar filters
  this.resource = ExploreContent;
};

export default HomeController;
