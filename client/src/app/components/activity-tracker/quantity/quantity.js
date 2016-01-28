const activityTrackerQuantity = function () {
  return {
    restrict: 'E',
    templateUrl: 'app/components/activity-tracker/quantity/quantity.html',
    controller: 'ActivityTrackerQuantityController',
    controllerAs: 'vm',
    bindToController: true,
    scope: {
      periodClicked: '&onPeriodClicked',
      periods: '=',
      type: '=',
    },
  };
};

export default activityTrackerQuantity;
