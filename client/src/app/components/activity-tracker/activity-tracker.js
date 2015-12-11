const activityTracker = function () {
  return {
    restrict: 'E',
    templateUrl: 'app/components/activity-tracker/activity-tracker.html',
    controller: 'ActivityTrackerController',
    controllerAs: 'vm',
    bindToController: true,
    scope: {
      activity: '=',
      isSaved: '=ssIsSaved'
    },
  };
};

export default activityTracker;
