const UserAssessmentController = function (UserAssessmentGroup) {
  'ngInject';

  UserAssessmentGroup.query().then((groups) => {
    this.hasAssessments = groups.filter(function (group) {
      return group.completed;
    }).length > 0;
  });

};

export default UserAssessmentController;
