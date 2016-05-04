const activityTrackerBinary = function () {
  return {
    restrict: 'E',
    templateUrl: 'app/components/activity-tracker/binary/binary.html',
    controller: 'ActivityTrackerBinaryController',
    controllerAs: 'vm',
    bindToController: true,
    scope: {
      periodClicked: '&onPeriodClicked',
      isFuturePeriod: '&isFuturePeriod',
      periods: '=',
      currentWeekNumber: '=',
    },
  };
};

export default activityTrackerBinary;
