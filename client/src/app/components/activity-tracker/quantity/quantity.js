const activityTrackerQuantity = function () {
  return {
    restrict: 'E',
    templateUrl: 'app/components/activity-tracker/quantity/quantity.html',
    controller: 'ActivityTrackerQuantityController',
    controllerAs: 'vm',
    bindToController: true,
    scope: {
      periodClicked: '&onPeriodClicked',
      isFuturePeriod: '&isFuturePeriod',
      periods: '=',
      currentWeekNumber: '=',
      type: '=',
    },
  };
};

export default activityTrackerQuantity;
