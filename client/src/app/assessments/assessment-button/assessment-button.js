const assessmentButton = function () {
  return {
    restrict: 'E',
    templateUrl: 'app/assessments/assessment-button/assessment-button.html',
    controller: 'AssessmentButtonController',
    controllerAs: 'vm',
    bindToController: true,
    scope: {},
  };
};

export default assessmentButton;
